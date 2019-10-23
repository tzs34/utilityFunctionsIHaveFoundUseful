import React from 'react'
import styled from 'styled-components'
import ThemeContext from '../../context/theme-context'
import ArrowContainer from './arrow-container'

const Header = styled.span`
  display: block;
  margin: 0 auto;
  width: 400px;
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  padding: 0.2em;
`

const Para = styled.p`
  text-align: left;
  font-size: 1em;
`

const layout = ({ header, paragraphs }, index) => {
  return (
    <div key={index}>
      <Header>{header}</Header>
      {paragraphs.map((str, index) => {
        return <Para key={`${str}${index}`}>{str}</Para>
      })}
    </div>
  )
}

const Section = props => {
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

export default Section
