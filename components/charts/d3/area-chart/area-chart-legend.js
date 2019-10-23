import React, {Component} from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const AreaChartLegend = (props) =>{

  let {arc, color, data, highestCount, pie, total} = props

  return(
        <g>
          {
            pie(data).map((d, index) => {
              let {name} = d.data
               let transform= 'translate(' + ((index*125)-5) + ',10)'
               let fill = color(name)
              return (
              <g transform={transform} key={index}>
              <rect
                width='10'
                height='10'
                rx='10'
                ry='10'
                x='20'
                y='10'
                style={{
                  fill
                }}
                />
                <text
                y='20'
                x='40'
                  style={{
                    fill,
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.8em'
                  }}>
                    {`${name}`}
                  </text>
                </g>
              )
             })
          }
        </g>
    )
}

export default AreaChartLegend
