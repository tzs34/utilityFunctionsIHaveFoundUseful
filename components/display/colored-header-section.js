import React from 'react'
import styled from 'styled-components'
import ThemeContext from '../../context/theme-context'
import ArrowContainer from './arrow-container'

const Header = styled.div`
  height: 30px;
  padding: 0.1em;
  background-color: ${props => props.headerBackgroundColor};
  color: ${props => props.headerColor};
  margin-bottom: 0.2em;
  text-align: center;

  & span {
    font-size: 1em;
    font-weight; 500;
  }
`

const Para = styled.p`
  text-align: left;
  font-size: 0.8em;
  line-height: 1.5em;
`

const layout = ({ header, paragraphs, headerBackgroundColor, headerColor }, index) => {
  return (
    <div key={index}>
      <Header headerBackgroundColor={headerBackgroundColor} headerColor={headerColor}>
        <span>{header}</span>
      </Header>
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
