import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dc from 'dc'
import { format } from 'd3'

let { string, object, func } = PropTypes

const Label = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${props => props.backgroundColor};
  color: ${props => props.color};
  padding: 10px;
  & span {
    text-align: center;
    font-size: 1.2em;
  }

  span:first-of-type {
    margin-right: 0.5em;
  }

  & svg {
    width: 0px;
    height: 0px;
  }
`

class NumberDisplay extends Component {
  static defaultProps = {
    formatNumber: format('.3s')
  }

  loadDisplay = container => {
    if (container) {
      this.display = dc.numberDisplay(container)
      this.display.redraw = this.redraw
      this.renderChart(this.display)
    }
  }

  renderChart = display => {
    let { crossfilter, formatNumber, group, label, valueAccessor } = this.props

    if (this.display) {
      display.resetSvg()
    }
    display
      .valueAccessor(valueAccessor)
      .formatNumber(formatNumber)
      .html({
        one: `${label}  <span >%number</span>`
      })
      .group(crossfilter[group])
    display.render()
  }

  redraw = () => {
    this.renderChart(this.display)
  }

  render() {
    let { color, backgroundColor } = this.props

    return (
      <Label color={color} backgroundColor={backgroundColor}>
        <div ref={this.loadDisplay} />
      </Label>
    )
  }
}

NumberDisplay.propTypes = {
  color: string,
  backgroundColor: string,
  group: string,
  label: string,
  crossfilter: object,
  formatNumber: func,
  valueAccessor: func
}

export default NumberDisplay
