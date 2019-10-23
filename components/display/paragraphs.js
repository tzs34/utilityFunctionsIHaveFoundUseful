import React from 'react'
import ThemeContext from '../../context/theme-context'
import ArrowContainer from './arrow-container'

const layout = (str, index) => (
  <p style={{ paddingBottom: 5 }} key={`${str}${index}`}>
    {str}
  </p>
)

const Paragraphs = props => {
  let { text, arrowPosition = 'bottomCenter', styles = {} } = props

  return (
    <ThemeContext.Consumer>
      {theme => {
        let { tmGrey, tmWhite, tmDefaultHelp } = theme
        let borderColor = styles.borderColor ? styles.borderColor : tmDefaultHelp
        let arrowBorderColor = styles.arrowBorderColor ? styles.arrowBorderColor : tmDefaultHelp
        let arrowColor = styles.arrowColor ? styles.arrowColor : tmDefaultHelp

        return (
          <ArrowContainer
            color={tmGrey}
            borderColor={borderColor}
            backgroundColor={tmWhite}
            arrowBorderColor={arrowBorderColor}
            arrowColor={arrowColor}
            arrowStyle={arrowPosition}
            text={text}
            textLayoutFunction={layout}
            arrowPosition={arrowPosition}
          />
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Paragraphs
