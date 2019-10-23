import React, {Component} from 'react'
import propTypes from 'prop-types'

const EmphasisChartLegend = (props) =>{

  let {color, height, highestCount:{name, count}, width} = props
  let fill = color(name)
  let transform = "translate(" +width/2+','+height/2+ ")"
  return(
        <g transform={transform} >
          <text
            textAnchor='middle'
            y={height/7}
            style={{
              fill,
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1em'
            }}>
              {`${count}`}
            </text>
          </g>
    )
}

export default EmphasisChartLegend
