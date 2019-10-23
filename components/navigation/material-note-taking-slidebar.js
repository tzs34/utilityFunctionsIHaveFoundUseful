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
import NotePad from './note-pad'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ThemeContext from '../../../common/context/theme-context'

import './draft.css'

const NotePadSlideBar = (props) => (
    <MuiThemeProvider>
      <Drawer
      width={450}
      anchor={'right'}
      open={props.isOpen}
      enterTransitionDuration={0}
      leaveTransitionDuration={0}>
      { props.isOpen &&
        <ThemeContext.Consumer>
          {theme =>
          <NotePad theme={theme} {...props} />
          }
        </ThemeContext.Consumer>
      }
      </Drawer>
    </MuiThemeProvider>
)

export default NotePadSlideBar
