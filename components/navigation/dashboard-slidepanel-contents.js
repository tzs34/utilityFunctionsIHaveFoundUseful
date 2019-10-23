import react from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import {FadeIn, tooltipStyle} from '../../styles'
import Navigation from './navigation'
import {FlexRow} from '../../styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Content = styled.div`
  height:98vh;
  background: ${props => props.theme[props.mode].sliderBackground};
  color: ${props => props.theme[props.mode].sliderColor};
  overflow: hidden;
`
const ToggleContainer = styled.div`
  margin-left: 190px;
  font-size: 1.6em;
  padding: 0.5em;
`
const OptionsContainer = styled.div`
  margin-top: 0/2em;
`
const Logo = styled.div`
  height: 32px;
  width: 90px;
  color: #757575;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 900;
  line-height: 18px;
  text-align: center;
  word-wrap: break-word;
  margin-left: 15%;
  padding: 10px;
  margin-top: 0.4em;
`

const SlidingPanelContent = (props) => {
  let {isOpen, toggleSideNav, menuItems, theme, mode} = props

  return (

    <Content theme={theme} mode={mode}>
      <FadeIn>
        <ToggleContainer>
          <div onClick={toggleSideNav} >
            {isOpen ?
              <FontAwesomeIcon icon="angle-double-left" />
              :
              <FontAwesomeIcon icon="angle-double-right"/>
              }
          </div>
        </ToggleContainer>
        <Logo>
          <img src={'../../assets/imgs/tm-white.png'}  alt="logo" style={{width:120, height:35}}/>
        </Logo>
        <OptionsContainer>
          {menuItems &&

              <Navigation items={menuItems} />

          }
        </OptionsContainer>
      </FadeIn>
    </Content>
  )
}

export default SlidingPanelContent
// ${props => props.theme[props.mode].sliderBackground};
// ${props => props.theme[props.mode].sliderColor};
