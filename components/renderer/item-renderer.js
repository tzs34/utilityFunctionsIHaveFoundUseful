import React from 'react'
import { css } from 'styled-components'
import PropTypes from 'prop-types'
import { FlexRow } from '../../styles'
import CheckCircle from '@material-ui/icons/CheckCircle'
import withWidth from '@material-ui/core/withWidth'

let { bool, string, number } = PropTypes

const Content = FlexRow.extend`
  border: 2px solid #eceff1;
  padding: 0.6em;
  ${props =>
    props.width === 'xl' &&
    css`
      margin-left: 0.5em;
      width: 90%;
    `}
  ${props =>
    props.width === 'lg' &&
    css`
      margin-left: 0.5em;
      width: 90%;
    `}
   ${props =>
     props.width === 'md' &&
     css`
       margin-left: 0em;
       width: 95%;
     `}
   ${props =>
     props.width === 'sm' &&
     css`
       margin-left: 0em;
       width: 100%;
     `}
    ${props =>
      props.width === 'xs' &&
      css`
        margin-left: 0em;
        width: 100%;
      `}
  span{
    text-align: left;
    ${props =>
      props.width === 'xl' &&
      css`
        font-size: 1.2em;
      `}
    ${props =>
      props.width === 'lg' &&
      css`
        font-size: 1.2em;
      `}
     ${props =>
       props.width === 'md' &&
       css`
         font-size: 0.9em;
       `}
     ${props =>
       props.width === 'sm' &&
       css`
         font-size: 0.85em;
       `}
      ${props =>
        props.width === 'xs' &&
        css`
          font-size: 0.85em;
        `}
  }
`

const Question = FlexRow.extend`
  align-items: start;
  justify-content: start;
  ${props =>
    props.width === 'xl' &&
    css`
      width: 90%;
    `}
  ${props =>
    props.width === 'lg' &&
    css`
      width: 90%;
    `}
   ${props =>
     props.width === 'md' &&
     css`
       width: 90%;
     `}
   ${props =>
     props.width === 'sm' &&
     css`
       width: 100%;
     `}
    ${props =>
      props.width === 'xs' &&
      css`
        width: 100%;
      `}
  svg {
    margin-right: 0.25em;
  }

  span {
    margin-left: ${props => (props.showIcon ? 0 : '2em')};
    color: ${props => props.color};
    padding: 0.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover{
      overflow: visible;
      white-space: normal;
      font-size: 0.95em;
    }
    ${props =>
      props.width === 'xl' &&
      css`
        width: 215px;
        font-size: 1em;
      `}
    ${props =>
      props.width === 'lg' &&
      css`
        width: 215px;
        font-size: 0.95em;
      `}
     ${props =>
       props.width === 'md' &&
       css`
         width: 120px;
         font-size: 0.9em;
       `}
     ${props =>
       props.width === 'sm' &&
       css`
         width: 120px;
         font-size: 0.9em;
       `}
      ${props =>
        props.width === 'xs' &&
        css`
          width: 120px;
          font-size: 0.9em;
        `}
  }

`
const TechItemRenderer = ({
  color,
  question,
  percentage,
  showIcon = true,
  showPercent = true,
  width
}) => {
  return (
    <Content width={width}>
      <Question showIcon={showIcon} color={color} width={width}>
        {showIcon && <CheckCircle />}
        <span>{question}</span>
      </Question>
      {showPercent && <span>{`${percentage}`}</span>}
    </Content>
  )
}

TechItemRenderer.propTypes = {
  showIcon: bool,
  question: string,
  percentage: number,
  color: string
}
export default withWidth()(TechItemRenderer)
