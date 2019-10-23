import React from 'react'
import styled from 'styled-components'
import { setArrowPosition } from '../../styles'

const ArrowContainer = ({
  arrowPosition,
  arrowColor,
  arrowBorderColor,
  backgroundColor,
  color,
  borderColor,
  text,
  textLayoutFunction
}) => {
  let arrow = setArrowPosition(arrowPosition, arrowBorderColor, arrowColor)

  let ArrowDiv = styled('div')(arrow, {
    background: backgroundColor,
    color,
    'text-align': 'left',
    'line-height': '1.6em',
    'font-size': '1em',
    padding: '1em',
    'border-width': '4px',
    'border-style': 'solid',
    'border-color': borderColor
  })

  return <ArrowDiv>{text.map(textLayoutFunction)}</ArrowDiv>
}

export default ArrowContainer
