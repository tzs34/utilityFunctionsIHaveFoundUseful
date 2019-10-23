import React, { Component } from 'react'
import { FlexRow } from '../../../styles'
import styled from 'styled-components'
import Copy from '../../../copy'

let { boundaryNotFoundMessage } = Copy

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  width: ${props => props.width}%;
  height: 100%;
`
const Bar = styled.div`
  background: ${props => props.color};
  width: ${props => props.width}%;
  height: 30px;
  margin-bottom: 1em;
  transition: width 400ms;
`

const Content = FlexRow.extend`
  justify-content: start;
  margin-bottom: 0.25em;
  & label {
    color: #616161;
    font-size: 1.2em;
    min-width: 220px;
    height: 30px;
    text-align: right;
    margin-right: 0.5em;
  }
  & span {
    width: ${props => props.width}%;
    text-align: right;
    font-size: 1.2em;
    display: block;
    color: white;
    padding: 0.3em;
  }
`

class SimpleRowChart extends Component {
  loadChart = (colors, data, maxValue, width) => {
    return data.map(({ label, value }, index) => {
      let increments = Math.ceil(width / maxValue)
      let barWidth = Math.ceil(increments * value)
      let color = value === boundaryNotFoundMessage ? '#DB1F6A' : colors[index]
      return (
        <li key={`${index}${label}`}>
          <Content>
            <label>{label}</label>
            <Bar width={barWidth} color={color}>
              <span width={barWidth}>{value}</span>
            </Bar>
          </Content>
        </li>
      )
    })
  }

  render() {
    let { colors, data, width, height, maxValue } = this.props
    return (
      <ListContainer width={width} height={height}>
        {data.length > 0 && this.loadChart(colors, data, maxValue, width)}
      </ListContainer>
    )
  }
}

export default SimpleRowChart
