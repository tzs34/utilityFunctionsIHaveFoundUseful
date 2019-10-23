import React, { Component } from 'react'
import styled from 'styled-components'
import Key from '../key'
import { FlexRow } from '../../../styles'

const ChartContainer = FlexRow.extend`
  justify-content: start;
  height: 100%;
  width: 100%;
`
const BarChartContainer = FlexRow.extend`
  flex-direction: column;
  justify-content: start;
  height: ${props => props.height}%;
  width: 200px;
`
const BarContainer = FlexRow.extend`
  justify-content: start;
  align-items: flex-end;
  height: 100%;
  width: 100%;
`
const Bar = styled.div`
  background: ${props => props.color};
  width: 50px;
  height: ${props => props.height}%;
  margin-bottom: 0.5em;
  margin-left: 0.25em;
`
const Text = styled.span`
  display: block;
  color: white;
  padding-top: 0.4em;
`
const Label = styled.label`
  margin-left: -50%;
`

class SimpleBarChart extends Component {
  loadChart = (colors, data, maxValue, height) => {
    return data.map(({ label, value }, index) => {
      let increments = Math.ceil(height / maxValue)
      let barHeight = Math.ceil(increments * value)
      let color = colors[index]
      return (
        <Bar key={`${index}${color}`} height={barHeight} color={color}>
          <Text>{value}</Text>
        </Bar>
      )
    })
  }

  render() {
    let { colors, label, data, showKey, width, height, maxValue } = this.props

    let keyLabels = data.map(d => d.label)

    return (
      <ChartContainer>
        <BarChartContainer width={width} height={height}>
          <BarContainer>
            {data.length > 0 && this.loadChart(colors, data, maxValue, height)}
          </BarContainer>
          <Label>{label}</Label>
        </BarChartContainer>
        {showKey && <Key width={200} height={height} labels={keyLabels} colors={colors} />}
      </ChartContainer>
    )
  }
}

export default SimpleBarChart
