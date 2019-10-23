import React, {Children,Component} from 'react'
import propTypes from 'prop-types'
import {arc, pie, scaleOrdinal} from 'd3'
import EmphasisChartLegend from './emphasis-chart-legend'
import EmphasisChartPath from './emphasis-chart-path'
import EmphasisChartLabel from './emphasis-chart-label'
import EmphasisChartLine from './emphasis-chart-line'
class EmphasisPieChart extends Component{

  static defaultProps = {
          width: 280,
          height: 200,
          padAngle:0,
          color:[],
          range: ['#33A1DE','#0D4F8B']
  }

    state = {width: 0}

    componentWillMount(){

      let{colors, data, height, padAngle, point, range, width} = this.props

      this.pie=pie()
              .value(function(d){return d.count})
              .sort(null);

      this.color = d3.scale.ordinal()
               .range(['#33A1DE','#0D4F8B']);

      let outerRadius=(width/3.25)-10;
      let innerRadius=50;

      this.arc= arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      this.innerArc = arc()
                    .innerRadius(innerRadius-13)
                    .outerRadius(innerRadius-10)


      this.chartData = data.reduce((acc, d) => {
        acc.total = acc.total + d.count
        return acc.count < d.count ? {...acc, ...d} : acc
      }, {total:0,count:0})

      this.setState({width});
    }

    render(){

      let legend;
      let {children, data, label, height, id}= this.props
      let {arc, color, innerArc, pie, chartData:{total, name, count}} = this
      let {width} = this.state

        return (
            <div>
              <svg id={id} width={width} height={height}>
              <EmphasisChartPath
                arc={arc}
                width={width}
                height={height}
                pie={pie}
                color={color}
                data={data}
                highest={{name, count}}
                   />
                 <EmphasisChartLine
                   arc={innerArc}
                   highestId={name}
                   data={data}
                   color={color}
                   pie={pie}
                   width={width}
                   height={height}
                   />

              {
                Children.count(children) === 1 &&
                  <EmphasisChartLegend
                     arc={arc}
                     color={color}
                     data={data}
                     total={total}
                     pie={pie}
                     />
                  }
                  <EmphasisChartLabel
                    color={color}
                    height={height}
                    highestCount={{name,count}}
                    width={width}
                    />
              </svg>
            </div>
        );
    }
}
export default EmphasisPieChart
