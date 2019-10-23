import React, {Children,Component} from 'react'
import propTypes from 'prop-types'
import {arc, pie, scaleOrdinal} from 'd3'
import styled from 'styled-components'
import {ChartHeader} from '../../../../styles'

const Title = ChartHeader.extend`
  margin-left: -200px;
  margin-bottom: 1em;

`

const Chart = styled.div`
margin-top: 2em;

    text {
      font-size: 0.8em;;
      padding-bottom: 2px;
      padding-top: 2px;
      font-weight: 300;
    }

    #explanation {
      font-size: 12px;
      max-width: 620px;
      margin: 0 auto;
      padding-top: 10px;
      color: #ababab;
      font-weight: 300;
    }

    .axis path,
    .axis line {
      fill: none;
    }

    .y.axis path {
      display: none;
    }

    .brush .extent {
      fill-opacity: .125;
      shape-rendering: crispEdges;
    }

    .resize {
      display: inline !important; /* show when empty */
      fill: #7A7A7A;
      fill-opacity: 1;
      stroke: #7A7A7A;
      stroke-width: 2px;
    }

    .bar {
       fill: steelblue;
      /*shape-rendering: crispEdges;*/
    }
`


class BrushRowChart extends Component{

  static defaultProps = {
          width: 400,
          height: 200,
          padAngle:0,
          color:[],
          range: ['#33A1DE','#0D4F8B'],
          margin: {top: 10, right: 10, bottom: 10, left: 100}
  }

    state = {width: 0}

    loadChart = (container) =>{

      let {crossfilter, dimension, group, rowsCap} = this.props

      let svg,
      defs,
      gBrush,
      brush,
      main_xScale,
      mini_xScale,
      main_yScale,
      mini_yScale,
      main_yAxis,
      mini_width,
      brushTotalStart,
      brushTotalEnd,
      updatedData,
      mousewheelTimer,
      scrolling = false,
      scrollEnd = false;


      let crossfilterData = crossfilter[group].top(Infinity)
      let data = crossfilterData.map ((d, i) => {
        d.index = i
        d.key = textTruncate(d.key, 22)
        return d
      })

      data.sort(function(a,b) { return b.value - a.value; });
      let displayedItems = data.slice(0, +rowsCap)


    var zoomer = d3.behavior.zoom()
        .on("zoom", null);

    var main_margin = {top: 10, right: 10, bottom: 10, left: 100},
        main_width = 600 - main_margin.left - main_margin.right,
        main_height = 400 - main_margin.top - main_margin.bottom;

    var mini_margin = {top: 10, right: 10, bottom: 10, left: 10},
        mini_height = 400 - mini_margin.top - mini_margin.bottom;
        mini_width = 100 - mini_margin.left - mini_margin.right;

    svg = d3.select(container).append("svg")
        .attr("class", "svgWrapper")
        .attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right)
        .attr("height", main_height + main_margin.top + main_margin.bottom)
        .call(zoomer)
        .on("wheel.zoom", scroll)
        //.on("mousewheel.zoom", scroll)
        //.on("DOMMouseScroll.zoom", scroll)
        //.on("MozMousePixelScroll.zoom", scroll)
        //Is this needed?
        .on("mousedown.zoom", null)
        .on("touchstart.zoom", null)
        .on("touchmove.zoom", null)
        .on("touchend.zoom", null);

        var mainGroup = svg.append("g")
                .attr("class","mainGroup")
                .attr("transform","translate(" + main_margin.left + "," + main_margin.top + ")")

        var miniGroup = svg.append("g")
                .attr("class","miniGroup")
                .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")")

        var brushGroup = svg.append("g")
                .attr("class","brushGroup")
                .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")")

                main_xScale = d3.scale.linear().range([0, main_width])
                mini_xScale = d3.scale.linear().range([0, mini_width])

                main_yScale = d3.scale.ordinal().rangeRoundBands([0, main_height/1.4], 0.4, 0)
                mini_yScale = d3.scale.ordinal().rangeBands([0, mini_height], 0.4, 0)

                //Create y axis object
                main_yAxis = d3.svg.axis()
                  .scale(main_yScale)
                  .orient("left")
                  .tickSize(0)
                  .outerTickSize(0);

                //Add group for the y axis
                mainGroup.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(100,0)");
                    main_xScale.domain([0, d3.max(data, function(d) { return d.value; })]);

              mini_xScale.domain([0, d3.max(data, function(d) { return d.value; })]);
              main_yScale.domain(data.map(function(d) { return d.key; }));
              mini_yScale.domain(data.map(function(d) { return d.key; }));

              //Create the visual part of the y axis
              d3.select(".mainGroup").select(".y.axis").call(main_yAxis);

              brushTotalStart = mini_yScale.domain()[0];
              brushTotalEnd = mini_yScale.domain()[1];

              var brushExtent = Math.max( 1, Math.min( 20, Math.round(data.length*0.2) ) );

      brush = d3.svg.brush()
          .y(mini_yScale)
          .extent([mini_yScale(data[0].key), mini_yScale(data[brushExtent].key)])
          .on("brush", brushmove)
          .on("brushend", brushend);

      //Set up the visual part of the brush
      gBrush = d3.select(".brushGroup").append("g")
        .attr("class", "brush")
        .call(brush);

      // gBrush.selectAll(".resize")
      //   .append("line")
      //   .attr("x2", mini_width);
      //
      // gBrush.selectAll(".resize")
      //   .append("path")
      //   .attr("d", d3.svg.symbol().type("triangle-up").size(20))
      //   .attr("transform", function(d,i) {
      //     return i ? "translate(" + (mini_width/2) + "," + 4 + ") rotate(180)" : "translate(" + (mini_width/2) + "," + -4 + ") rotate(0)";
      //   });

      gBrush.selectAll("rect")
        .attr("width", mini_width);

      gBrush.select(".background")
        .on("mousedown.brush", brushcenter)
        .on("touchstart.brush", brushcenter);

        //DATA JOIN
        var bar = d3.select(".mainGroup").selectAll(".bar")
            .data(data, function(d) { return d.index; });

        //UPDATE
        bar
          .attr("width", function(d) { return main_xScale(d.value/2); })
          .attr("y", function(d,i) {return 40 * i; })
          .attr("transform", "translate(100,0)")
          .attr("height", main_yScale.rangeBand());

        //ENTER
        bar.enter().append("rect")
          .attr("class", "bar")
          .attr("x", 0)
          .attr("width", function(d) {return main_xScale(d.value/2); })
          .attr("y", function(d,i) {return 40 * i;})
          .attr("transform", "translate(100,0)")
          .attr("height", main_yScale.rangeBand());

          //.style("fill", "#3B8C3D");

        //EXIT
        bar.exit()
          .remove();

          //The mini brushable bar
              //DATA JOIN
              var mini_bar = d3.select(".miniGroup").selectAll(".bar")
                .data(data, function(d) { return d.index; });

              //UDPATE
              mini_bar
                .attr("width", function(d) { return mini_xScale(d.value); })
                .attr("y", function(d,i) { return mini_yScale(d.key); })
                .attr("height", mini_yScale.rangeBand());

              //ENTER
              mini_bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("width", function(d) { return mini_xScale(d.value); })
                .attr("y", function(d,i) { return mini_yScale(d.key); })
                .attr("height", mini_yScale.rangeBand())
                .style("fill", "url(#gradient-rainbow-mini)");
                //.style("fill", "#3B8C3D");

              //EXIT
              mini_bar.exit()
                .remove();

              //Start the brush
              gBrush.call(brush.event);

        function brushmove() {

           //What is the extent of the brush
           var extent = brush.extent();

           //Adjust the extent of the brush so that is snaps to the bars
           if (d3.event.mode === "move" || scrollEnd === true) {
             //If dragging, preserve the width of the extent

             //Does the top edge lie closer to the upper or lower bar
             var topExtent = extent[0];
             //Using ES5 - http://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
             var closestTop = mini_yScale.range().reduce(function (prev, curr) {
               return (Math.abs(curr - topExtent) < Math.abs(prev - topExtent) ? curr : prev);
             });

             //Pixel location of the bottom bar
             var maxBar = d3.max(mini_yScale.range());
             //Does the top edge lie closer to the upper or lower bar
             var bottomExtent = extent[1];
             //Using ES5 - http://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
             var closestBottom = mini_yScale.range().reduce(function (prev, curr) {
               return (Math.abs(curr - bottomExtent) < Math.abs(prev - bottomExtent) ? curr : prev);
             });

             //Don't let it go over the last bar in the design
             if(maxBar === closestBottom) {
               //The new extent that snaps to the bars
               extent = [closestBottom+mini_yScale.rangeBand()-(extent[1] - extent[0]),closestBottom+mini_yScale.rangeBand()];
             } else {
               //The new extent that snaps to the bars
               extent = [closestTop,closestTop+(extent[1] - extent[0])];
             }//else

           } else if (!scrolling) {
             //If changing size, snap to the nearest rect

             //Find the pixel values of the bars that lie within the selected brush
             var pixelRanges = mini_yScale.range()
               .filter(function(d) { return (d >= extent[0]-mini_yScale.rangeBand()/2) && (d <= extent[1]); });

             //The new extent that snaps to the bars within the selection
             extent = [d3.min(pixelRanges),d3.max(pixelRanges)+mini_yScale.rangeBand()];
           }//else if
           //else do nothing - then it comes from the scrolling and the extent has already been determined

           //Snap to rect edge - the new extent
           d3.select("g.brush")
             .call(brush.extent(extent));

           //What bars are captured in the brush
           //During scrolling take a wider range and don't snap
           if( scrolling ) {
             var selected = mini_yScale.domain()
               .filter(function(d) { return (extent[0]-1e-3-mini_yScale.rangeBand() <= mini_yScale(d)) && (mini_yScale(d) <= extent[1]+1e-3+mini_yScale.rangeBand() ); });
           } else {
             var selected = mini_yScale.domain()
               .filter(function(d) { return (extent[0]-1e-3 <= mini_yScale(d)) && (mini_yScale(d) <= extent[1]+1e-3); });
           }

           //Take a subset of the selected data from the original dataset
           updatedData = data.filter(function(d) { return selected.indexOf(d.key) > -1; });

           //Update the colors of the mini chart - Make everything outside the brush grey
           d3.select(".miniGroup").selectAll(".bar")
             .style("fill", function(d, i) { return selected.indexOf(d.key) > -1 ? 'steel-blue' : "#e0e0e0"; });

           ////Update the main chart
           ////If you want to see update during a brush moving uncomment this
           ////But that doesn't work very well with the transitions of the bars in the update function & scrolling
           //update(updatedData);

         }

         function brushend() {
            if(!scrolling) update(updatedData);
        }

        function brushcenter() {
          var target = d3.event.target,
          extent = brush.extent(),
          size = extent[1] - extent[0],
          range = mini_yScale.range(),
          y0 = d3.min(range) + size / 2,
          y1 = d3.max(range) + mini_yScale.rangeBand() - size / 2,
          center = Math.max( y0, Math.min( y1, d3.mouse(target)[1] ) );

        d3.event.stopPropagation();

        gBrush
            .call(brush.extent([center - size / 2, center + size / 2]))
            .call(brush.event);

      }



      function update(data) {

         //The transition (& delay) time of the bars and the axis
         var transTime = 200;
         var delayTime = scrollEnd ? 0 : transTime;

         /////////////////////////////////////////////////////////////
         ///////////////////// Update the axis ///////////////////////
         /////////////////////////////////////////////////////////////

         //Update the domain of the y scale of the big bar chart
         main_yScale.domain(data.map(function(d) { return d.key; }));//d.key

         //Update the y axis of the big chart
         d3.select(".mainGroup")
           .select(".y.axis")
           .transition()
           .duration(transTime).delay(delayTime)
           .call(main_yAxis);

         /////////////////////////////////////////////////////////////
         ////////// Update the bars of the main bar chart ////////////
         /////////////////////////////////////////////////////////////

         //DATA JOIN
         var bar = d3.select(".mainGroup").selectAll(".bar")
             .data(data, function(d) { return d.value; });

         //UPDATE
         bar
           .transition().duration(transTime).delay(delayTime)
           .attr("x", 0)
           .attr("width", function(d) { return main_xScale(d.value/1.4); })
           .attr("y", function(d,i) {return 40 * i; })
           .attr("transform", "translate(100,0)")
           .attr("height", main_yScale.rangeBand());

         //ENTER
         bar.enter().append("rect")
           .attr("class", "bar")
           .attr("x", 0)
           .attr("width", 0)
           .attr("y", function(d,i) { return 40 * i; })
           .attr("height", main_yScale.rangeBand())
           .attr("transform", "translate(100,0)")
           .transition().duration(transTime).delay(delayTime*2)
           .attr("width", function(d) { return main_xScale(d.value/2); });

         //EXIT
         bar.exit()
           .transition().duration(transTime)
           .attr("width", 0)
           .remove();

       }

       function scroll() {

         if (mousewheelTimer) clearTimeout(mousewheelTimer);

         var extent = brush.extent(),
           size = extent[1] - extent[0],
           range = mini_yScale.range(),
           y0 = d3.min(range),
           y1 = d3.max(range),
           dy = d3.event.deltaY,
           topSection;

         scrolling = true;

         if( extent[0] - dy < y0 ) {
           topSection = y0;
         } else if ( extent[1] - dy > y1 ) {
           topSection = y1 - size;
         } else {
           topSection = extent[0] - dy;
         }//else

         //Once the person stops scrolling, run the update data function
         mousewheelTimer = setTimeout(function() {
             mousewheelTimer = null;
             scrolling = false;
             scrollEnd = true;

             //Finally snap the brush and update the data
             gBrush
               .call(brush.event);

             scrollEnd = false;
           }, 200);

         d3.event.stopPropagation();
         d3.event.preventDefault();

         //Update the brush position during the scrolling
         if(scrolling) {
           gBrush
               .call(brush.extent([ topSection, topSection + size ]))
               .call(brush.event);
         }//if

       }

     function textTruncate (str, length, ending) {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      }

    }

    render(){

      let {chartTitle} = this.props
        return (
          <Chart>
               <Title>{this.props.chartTitle}</Title>
            <div ref={this.loadChart}></div>
          </Chart>

        );
    }
}
export default BrushRowChart

// class BrushRowChart extends Component{
//
//   static defaultProps = {
//           width: 280,
//           height: 200,
//           padAngle:0,
//           color:[],
//           range: ['#33A1DE','#0D4F8B'],
//           margin: {top: 10, right: 10, bottom: 10, left: 100}
//   }
//
//     state = {width: 0}
//
//     componentWillMount(){
//
//       let{colors, data, height, margin, padAngle, point, range, width} = this.props
//
//
//     }
//
//     render(){
//
//       let legend;
//       let {children, data, label, height, id}= this.props
//       let {arc, color, innerArc, pie, chartData:{total, name, count}} = this
//       let {width} = this.state
//
//       let main_margin = {top: 10, right: 10, bottom: 10, left: 100}
//
//       let main_margin = {top: 10, right: 10, bottom: 10, left: 100},
//           main_width = 500 - main_margin.left - main_margin.right,
//           main_height = 400 - main_margin.top - main_margin.bottom;
//
//       let mini_margin = {top: 10, right: 10, bottom: 10, left: 10},
//           mini_height = 400 - mini_margin.top - mini_margin.bottom;
//       mini_width = 100 - mini_margin.left - mini_margin.right;
//
//
//       let transformMain =`translate(${mainMargin.left}, ${mainMargin.top})`
//
//       let transformBrush = `translate((${main_margin.left} + ${main_width} + ${main_margin.right} + ${mini_margin.left}) , ${mini_margin.top})`
//
//   let     main_xScale = d3.scaleLinear().range([0, main_width]);
//   let mini_xScale = d3.scaleLinear().range([0, mini_width]);
//
//   let main_yScale = d3.scaleOrdinal().rangeRoundBands([0, main_height], 0.4, 0);
//   let mini_yScale = d3.scaleOrdinal().rangeBands([0, mini_height], 0.4, 0);
//
//     //Create y axis object
//   let main_yAxis = d3.svg.axis()
//       .scale(main_yScale)
//       .orient("left")
//       .tickSize(0)
//       .outerTickSize(0);
//
//
//         return (
//             <div>
//               <svg id={id} className="svgWrapper" width={width} height={height}>
//                 <g transform={transformMain}>
//                   <Axis axis={main_yAxis} />
//                 </g>
//                 <g transform={transformMini}>
//                   <g id='brushGroup'>
//                     <g id='brush'>
//                       <rect id='background'/>
//                       <Extent id='extent'/>
//                     <Resize id='resize-n'>
//                       <rect />
//                       <line />
//                       <path />
//                     </g>
//                     <Resize id='resize-s'>
//                       <rect />
//                       <line />
//                       <path />
//                     </g>
//                   </g>
//                 </g>
//                 <g transform={transformBrush} />
//                 <defs>
//                 </defs>
//               </svg>
//             </div>
//         );
//     }
// }
