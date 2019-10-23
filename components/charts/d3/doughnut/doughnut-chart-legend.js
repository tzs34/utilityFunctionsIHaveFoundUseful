
import React, {Component} from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import * as d3 from 'd3'

const DoughNutChartLegend = (props) =>{

  let {color, data, height, label, pie, radius, width} = props
  let legendY=height/2-data.length*30/2
  let transform="translate("+(width/2+80)+","+legendY+")"

  return(
        <g transform={transform} style={width <= height+70 ? {visibilty: 'hidden'} :{ visibility: 'visible'} }>
            {
              pie(data).map((d, index) => {
                let transform="translate(-225,"+index*30+")"
                let styleColor = color(index)
                return(
                  <g transform={transform} key={index}>
                    <rect
                      width="20"
                      height="20"
                      style={{fill: styleColor, stroke: styleColor}}
                      rx={radius}
                      ry={radius}
                      />
                    <text
                     x="30"
                     y="15"
                      style={{
                        fill: styleColor,
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.8em'
                      }}>
                        {d.data[label]}
                      </text>
                  </g>
                )
              })
            }
        </g>
    )
}


export default DoughNutChartLegend
