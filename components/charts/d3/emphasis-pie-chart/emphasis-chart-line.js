import React, {Component} from 'react'
import propTypes from 'prop-types'

const EmphasisChartLine = (props) => {

  let {arc, color, data, height, highestId, pie, width} = props
  let transform = "translate(" +width/2+','+height/1.6+ ")"

  return (
    <g transform={transform}  >
      {
        pie(data).map( (d, index)  => {
          let fill = d.data.name === highestId ? color(d.data.name): 'transparent'
          return <path fill={fill} d={arc(d)} key={index}/>
        })
      }

    </g>
  )
}

export default EmphasisChartLine
