import React, {Component} from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const EmphasisChartLegend = (props) =>{

  let {arc, color, data, highestCount, pie, total} = props

  return(
        <g>
          {
            pie(data).map((d, index) => {
              let {name, count} = d.data
               let c= arc.centroid(d, index)
               let transform= "translate(" +(c[0])+','+(c[1]/2) + ")"
               let percent = Math.floor((count/total)*100)
               let fill = color(name)
              return (
              <g transform={transform} key={index}>
                <text
                y="40"
                x="80"
                  style={{
                    fill,
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.8em'
                  }}>
                    {`${name} (${percent}%)`}
                  </text>
                </g>
              )
             })
          }
        </g>
    )
}


export default EmphasisChartLegend
