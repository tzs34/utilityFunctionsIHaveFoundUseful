
import React, {Component} from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import * as d3 from 'd3'

class DoughNutChartPath extends Component{

    componentWillMount(){

      let{height, innerRadiusRatio} = this.props

      let radius= height
      let outerRadius=radius/2
      let innerRadius=radius/this.props.innerRadiusRatio

        this.arc=d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)

        this.transform='translate('+radius * 1.5+','+radius/2+')'

    }

    render(){

      let {pie, data, color} = this.props
      let {arc, transform} = this

        return(
            <g transform={transform}>
                {
                  pie(data).map( (d, index)  => <path fill={color(index)} d={arc(d)} key={index}/>)
                }
            </g>
        )
    }
}

export default DoughNutChartPath
