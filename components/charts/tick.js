import React, { Component } from 'react'
import styled from 'styled-components'
/**
 *   ___________   or __________
 *       |                |label
 *     label
 */

const Text = styled.text`
  font-size: 1em;
  color: #000000;
  width: 50px;
  height: 50px;
`

class Tick extends Component {
  renderLabel = (label, isTop, tickSize) => {
    const { labelAlign } = this.props

    const baseLine = isTop ? 'baseline' : 'hanging'

    if (labelAlign === 'adjacent') {
      const x = 2
      const y = isTop ? -6 : 6
      return (
        <Text key={`label-${label}`} textAnchor="left" x={x} y={y} alignmentBaseline={baseLine}>
          {label}
        </Text>
      )
    } else if (labelAlign === 'center') {
      const x = 0
      const y = isTop ? -tickSize - 3 : tickSize + 3
      return (
        <Text key={`label-${label}`} textAnchor="middle" x={x} y={y} alignmentBaseline={baseLine}>
          {label}
        </Text>
      )
    }
  }

  renderVerticalTick = (id, label, labelPosition, size, extend, isTop) => {
    const dir = isTop ? -1 : 1
    const line = {
      x1: 0,
      y1: -dir * extend,
      x2: 0,
      y2: dir * size
    }

    const style = { stroke: '#AAA', strokeWidth: 1 }
    const groupKey = `grp-${id}}`
    const tickKey = `tick-${id}`

    return (
      <g className="tick-grp" key={groupKey}>
        <line key={tickKey} className="tick-line" style={style} {...line} />
        {this.renderLabel(label, isTop, size)}
      </g>
    )
  }

  renderHorizontalTick = (id, label, labelPosition, size, extend, isLeft) => {
    const dir = isLeft ? -1 : 1
    const line = {
      x1: -dir * extend,
      y1: 0,
      x2: dir * size,
      y2: 0
    }

    const style = { stroke: '#AAA', strokeWidth: 1 }
    const groupKey = `grp-${id}}`
    const tickKey = `tick-${id}`

    return (
      <g className="tick-grp" key={groupKey}>
        <line key={tickKey} className="tick-line" style={style} {...line} />
        <Text
          key={`label-${label}`}
          textAnchor={isLeft ? 'end' : 'begin'}
          alignmentBaseline="middle"
          x={isLeft ? -size - 3 : size + 3}
          y={0}
        >
          {label}
        </Text>
      </g>
    )
  }

  render() {
    const {
      id,
      label,
      width,
      height,
      position,
      size = 10,
      extend = 0,
      align = 'top'
      // transitionTime
    } = this.props

    if (align === 'top' || align === 'bottom') {
      const transform = `translate(${position}px, ${align === 'top' ? height : 0}px)`
      // const transition = `transform ${transitionTime}ms`;
      return (
        <g className="tick-grp" style={{ transform }}>
          {this.renderVerticalTick(id, label, position, size, extend, align === 'top')}
        </g>
      )
    } else {
      const transform = `translate(${align === 'left' ? width : 0}px,${position}px)`
      // const transition = `transform ${transitionTime}ms`;
      return (
        <g className="tick-grp" style={{ transform }}>
          {this.renderHorizontalTick(id, label, position, size, extend, align === 'left')}
        </g>
      )
    }
  }
}

Tick.defaultProps = {
  position: 0,
  size: 15,
  align: 'bottom',
  labelAlign: 'adjacent',
  tickSize: 15,
  tickExtend: 0
}

export default Tick
