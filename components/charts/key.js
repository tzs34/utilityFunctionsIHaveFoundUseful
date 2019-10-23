import React from 'react'
import styled from 'styled-components'
import { FlexRow } from '../../styles'

const KeyContainer = FlexRow.extend`
  flex-direction: column;
  justify-content: space-evenly
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: 0.2em 1em;
`
const ColorKey = styled.div`
  background: ${props => props.color};
  width: 20px;
  height: 20px;
`

const Label = styled.span`
  text-align: left;
  width: 200px;
  padding: 0.5em;
`
const Key = props => {
  let { labels, colors, width, height } = props
  return (
    <KeyContainer width={width} height={height}>
      {labels.map((label, index) => {
        return (
          <FlexRow key={`${index}${label}`}>
            <ColorKey color={colors[index]} />
            <Label>{label}</Label>
          </FlexRow>
        )
      })}
    </KeyContainer>
  )
}

export default Key
