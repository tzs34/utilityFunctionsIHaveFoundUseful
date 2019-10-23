
import React, {Component} from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import {DashboardHeader} from '../../../styles'

const {array, string} = propTypes

class MultiRingChart extends Component {

  loadChart = () => {

    let{multiId} = this.props
    console.log(multiId)
    let dataset     = {
          lifetime    : [51,100],
          actual      : [49,100]},
      chartColors  = {
          light   : ['#f0f9f9','#eaf7f6','#e4f0f0'],
          dark    : ['#7ac3c7','#48adb4','#20767c']},
      //SVG properties
      width       = 160,
      height      = 160,
      arcWidth    = 18,
      arcMargin   = 4,
      outerRadius = Math.min(width,height)/2,
      innerRadius = (outerRadius/5)*4,
      twoPI       = 2 * Math.PI,
      //colors and shapes
      color       = d3.scale.category20(),
      pie         = d3.layout.pie().sort(null),
      roundedArc  = d3.svg.arc().cornerRadius(outerRadius - innerRadius),
      arc         = d3.svg.arc(),
      entries     = d3.entries(dataset),
      values      = d3.values(dataset),
      keys        = d3.keys(dataset),
      //DOM manipulation
      svg  = d3.select(`#${multiId}`).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
      gs          = svg.selectAll("g").data(values).enter().append("g"),
      subpath     = gs.selectAll("g").data([1]).enter().append("path")
          .attr("fill", function(d,i,j) {
              return chartColors.light[j];
          })
          .attr("d", function(d, i, j) {
              let inner = arcMargin + arcWidth*(j+1),
                  outer = arcWidth*(j+2);

              return arc.innerRadius(inner).outerRadius(outer)({data: keys[j], value: values[j][0], startAngle: 0, endAngle: twoPI, padAngle: 0});
          }),
      path        = gs.selectAll("g")
          .data(function(d, i) {
              return pie(d);
          })
          .enter().append("path")
          .attr("fill", function(d, i, j) {
              if(i == 0)
                  return chartColors.dark[j];
              else
                  return chartColors.light[j];
          })
          .attr("d", function(d, i, j) {
              let inner = arcMargin + arcWidth*(j+1),
                  outer = arcWidth*(j+2);

              return roundedArc.innerRadius(inner).outerRadius(outer)(d);
          })
          .attr("data-value", function(d, i) {
              return d.value;
          });

}


  render(){

    let {multiId} = this.props

    return (
      <div id={multiId} ref={this.loadChart}></div>
    )
  }
}


export default MultiRingChart
