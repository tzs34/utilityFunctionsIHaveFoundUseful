import React, { Component } from 'react'
import { scaleLinear, scaleLog, scalePow } from 'd3'
import Tick from './tick'

class Axis extends Component {
  renderAxisLabel = () => {
    let { width, height, position, labelPosition, label } = this.props
    let translate
    let rotate = `rotate(0)`
    let anchor = 'start'
    switch (position) {
      case 'left':
        translate = `translate(${width - labelPosition},5)`
        rotate = `rotate(-90)`
        anchor = 'end'
        break
      case 'right':
        translate = `translate(${labelPosition},5)`
        rotate = `rotate(-90)`
        anchor = 'end'
        break
      case 'top':
        translate = `translate(5, ${height - labelPosition})`
        break
      case 'bottom':
        translate = `translate(5, ${labelPosition})`
        break
      default:
    }
    return (
      <g transform={translate}>
        <text transform={rotate} textAnchor={anchor}>
          {label}
        </text>
      </g>
    )
  }

  renderAxisLine = () => {
    let { position, width, margin, height } = this.props
    let p = position

    if (p === 'left' || p === 'right') {
      return (
        <line
          key="axis"
          style={{ stroke: '#AAA', strokeWidth: 0.5 }}
          x1={p === 'left' ? width : 0}
          y1={margin}
          x2={p === 'left' ? width : 0}
          y2={height - margin}
        />
      )
    } else {
      return (
        <line
          key="axis"
          style={{ stroke: '#AAA', strokeWidth: 0.5 }}
          x1={margin}
          y1={p === 'bottom' ? 0 : height}
          x2={width - margin}
          y2={p === 'bottom' ? 0 : height}
        />
      )
    }
  }

  renderAxisTicks = () => {
    let {
      absolute,
      format,
      position,
      width,
      margin,
      height,
      type,
      min,
      max,
      exponent,
      tickCount,
      tickExtend,
      tickFormatSpecifier,
      tickSize
    } = this.props
    let p = position
    let scale
    switch (type) {
      case 'linear':
        scale = scaleLinear()
          .domain([min, max])
          .range(p === 'left' || p === 'right' ? [height - margin * 2, 0] : [0, width - margin * 2])
        break

      case 'log':
        scale = scaleLog()
          .domain([min, max])
          .range(p === 'left' || p === 'right' ? [height - margin * 2, 0] : [0, width - margin * 2])
        break

      case 'power':
        scale = scalePow()
          .exponent(exponent)
          .domain([min, max])
          .range(p === 'left' || p === 'right' ? [height - margin * 2, 0] : [0, width - margin * 2])
        break

      default:
    }

    return scale.ticks(tickCount).map((tickValue, tickIndex) => {
      const tickPosition = scale(tickValue) + margin

      // Get a d3 format function, either from the string the user
      // supplied in the format prop, or ask the scale for its
      // suggestion
      const d3Format = format ? format(format) : scale.tickFormat(tickCount, tickFormatSpecifier)

      const formatter = d => (absolute ? d3Format(Math.abs(d)) : d3Format(d))
      const label = formatter(tickValue)

      return (
        <Tick
          key={tickValue}
          align={position}
          label={label}
          labelAlign="center"
          position={tickPosition}
          size={tickSize}
          extend={tickExtend}
          width={width}
          height={height}
        />
      )
    })
  }

  renderAxis = () => {
    return (
      <g>
        {this.renderAxisLine()}
        {this.renderAxisTicks()}
      </g>
    )
  }

  render() {
    let { height, width } = this.props

    return (
      <svg height={height} width={width}>
        {this.renderAxis()}
      </svg>
    )
  }
}

Axis.defaultProps = {
  width: 100,
  height: 100,
  tickCount: 10,
  tickSize: 5,
  tickExtend: 0,
  margin: 10,
  type: 'linear',
  exponent: 2,
  standalone: false,
  labelPosition: 50,
  labelStyle: {
    fill: 'grey',
    stroke: 'red',
    pointerEvents: 'none'
  },
  absolute: false
}

export default Axis
