import React, {Component} from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Drawer from 'material-ui/Drawer'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {blue700, indigo900} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'

import {FadeIn, tooltipStyle} from '../../styles'
import Navigation from './navigation'
import {FlexRow} from '../../styles'
import Content from './dashboard-slidepanel-contents'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ThemeContext from '../../../common/context/theme-context'

const ToggleContainer = styled.div`
  position: absolute;
  top: 0.2em;
  right: 1em;
  font-size: 2.8em;
  padding: 0.5em;
`
const OptionsContainer = styled.div`
  background: ${props => props.theme[props.mode].background};
  color: ${props => props.theme[props.mode].color};
  margin-top: 2em;
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
  margin-left: 25%;
  padding: 10px;
  margin-top: 3.5em;
  margin-bottom: 10px;
`



const MaterialSlideBar = (props) => (
    <MuiThemeProvider>
      <Drawer
      anchor={props.direction}
      open={props.isOpen}
      enterTransitionDuration={0}
      leaveTransitionDuration={0}>
      { props.isOpen &&
        <ThemeContext.Consumer>
          {theme =>
          <Content theme={theme} {...props} />
          }
        </ThemeContext.Consumer>
      }
      </Drawer>
    </MuiThemeProvider>
)

export default MaterialSlideBar

  // <div><i className="fa-angle-double-left"></i></div>
