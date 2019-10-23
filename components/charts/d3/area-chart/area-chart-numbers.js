import React, {Component} from 'react'
import propTypes from 'prop-types'

const AreaChartLegend = (props) =>{

  let {arc, data, pie, height} = props

  return(
        <g>
          {
            pie(data).map((d, index) => {
              let {count} = d.data
              let transform= "translate(" + arc.centroid(d) + ")"

              return (
              <g transform={transform} key={index}>
                <text
                y='115'
                x='88'
                  style={{
                    fill:'#ffffff',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '0.8em'
                  }}>
                    {`${d.data.percent}%`}
                  </text>
                </g>
              )
             })
          }
        </g>
    )
}

export default AreaChartLegend
