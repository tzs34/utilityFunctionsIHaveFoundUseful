
import React, {Component} from 'react'
import propTypes from 'prop-types'

const EmphasisChartPath = (props) => {

  let {arc, color, data, pie, width, height} = props
  let  transform= 'translate('+width/2+','+height/1.6+')'
  return (
    <g transform={transform} >
      {
        pie(data).map( (d, index)  => <path fill={color(d.data.name)} d={arc(d)} key={index}/>)
      }
    </g>
  )
}

export default EmphasisChartPath
