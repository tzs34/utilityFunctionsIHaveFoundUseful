import React from 'react'
import PropTypes from 'prop-types'
import { FlexRow } from '../../styles'
import InfoTip from '../display/info-tip'

let { bool, string, oneOf } = PropTypes

const Content = FlexRow.extend`
  justify-content: flex-start;
  padding: 1em;
  font-size: 1.2em;
  font-weight: 500;
  font-family: Roboto, sans serif;
  border-style: solid;
  border-bottom-color: #eceff1;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  width: 100%;

  span {
    color: ${props => props.color};
    word-wrap: break-word;
    margin-right: 0.4em;
    display: block;
    text-align: left;
  }
`

const InfoRenderer = ({
  arrowPosition,
  color,
  icon,
  id,
  information,
  uppercase = true,
  position,
  title
}) => {
  return (
    <Content color={color} uppercase={uppercase}>
      <span>{title}</span>
      <InfoTip
        text={information}
        position={position}
        arrowPosition={arrowPosition}
        icon={icon}
        color={color}
        id={id}
      />
    </Content>
  )
}

InfoRenderer.propTypes = {
  arrowPosition: oneOf(['up', 'down', 'left', 'right', 'center']),
  color: string,
  id: string,
  information: string,
  uppercase: bool,
  position: oneOf(['up', 'down', 'left', 'right', 'center']),
  title: string,
  width: string
}

export default InfoRenderer
