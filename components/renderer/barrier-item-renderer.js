import React from 'react'
import { FlexRow } from '../../styles'
import CheckCircle from '@material-ui/icons/CheckCircle'

const Question = FlexRow.extend`
  align-items: start;
  justify-content: start;
  padding: 1em;
  border: 2px solid #eceff1;
  width: 95%;
  span {
    color: ${props => props.color};
    width: 90%;
    font-size: 1.2em;
    color: #706f6f;
    text-align: left;
    font-style: italic;
    padding: 0.1em;
    width: 450px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 15px;
  }
`
const BarrierRenderer = ({ question, showIcon, color }) => {
  return (
    <Question showIcon={showIcon} color={color}>
      {showIcon && <CheckCircle />}
      <span>{question}</span>
    </Question>
  )
}

export default BarrierRenderer
