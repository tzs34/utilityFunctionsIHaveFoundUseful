import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { FlexRow } from '../../styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

let { string, number, object } = PropTypes

const ProgressContainer = FlexRow.extend`
  position: relative;
  justify-content: flex-end;
  width: ${props => props.width}%;
  & span{
    display: block;
    padding: 0.2em 0em;
    ${props =>
      props.fontSize === 'lg' &&
      css`
        font-size: 1.1em;
      `}
     ${props =>
       props.fontSize === 'md' &&
       css`
         font-size: 0.9em;
       `}
     ${props =>
       props.fontSize === 'sm' &&
       css`
         font-size: 0.8em;
       `}
      ${props =>
        props.fontSize === 'xs' &&
        css`
          font-size: 0.8em;
        `}
  }

  & svg {
    width: ${props => props.progressWidth}px;
    height: ${props => props.progressHeight}px;
  }
`

const Percentage = styled.span`
  font-family: Roboto;
  font-size: 0.9em;
  top: 1.6em;
  ${props =>
    props.percent === '100%' &&
    css`
      margin-left: 1.5em;
    `} ${props =>
    props.fontSize !== '100%' &&
    css`
      margin-left: 1.8em;
    `}
  position: absolute;
`

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

const Progress = ({ classes, name, percent, progressWidth, progressHeight, width }) => {
  let percentNum = parseInt(percent.replace(/%/, ''))
  return (
    <ProgressContainer progressWidth={progressWidth} progressHeight={progressHeight} width={width}>
      <div>
        <span>{name}</span>
      </div>
      <div>
        <Percentage>{percent}</Percentage>
        <CircularProgress className={classes.progress} variant="static" value={percentNum} />
      </div>
    </ProgressContainer>
  )
}

Progress.propTypes = {
  name: string,
  percent: number,
  progressWidth: number,
  progressHeight: number,
  classes: object
}

export default withStyles(styles)(Progress)
