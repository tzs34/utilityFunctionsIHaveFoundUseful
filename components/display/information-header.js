import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ThemeContext from '../../context/theme-context'
import InfoItemRenderer from '../renderer/info-renderer'

let { bool, string, oneOf } = PropTypes

const InfoItemContainer = styled.div`
  padding: 0.2em;
  width: ${props => props.width}%;
`

class InformationHeaderComponent extends Component {
  render() {
    let {
      id,
      title,
      information,
      icon,
      width = 100,
      position = 'center',
      arrowPosition = 'center',
      uppercase = true,
      textColor = 'grey'
    } = this.props
    return (
      <ThemeContext.Consumer>
        {theme => {
          let { tmLabelGrey, tmPurple } = theme
          let colorMap = {
            grey: tmLabelGrey,
            purple: tmPurple
          }
          let color = colorMap[textColor]

          return (
            <InfoItemContainer width={width}>
              <InfoItemRenderer
                id={id}
                title={title}
                information={information}
                arrowPosition={arrowPosition}
                position={position}
                icon={icon}
                width={width}
                color={color}
                uppercase={uppercase}
              />
            </InfoItemContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

InformationHeaderComponent.propTypes = {
  information: string,
  uppercase: bool,
  id: string,
  title: string,
  textColor: oneOf(['grey', 'purple']),
  width: string,
  position: oneOf(['center', 'left', 'right']),
  arrowPosition: oneOf(['center', 'left', 'right'])
}

export default InformationHeaderComponent
