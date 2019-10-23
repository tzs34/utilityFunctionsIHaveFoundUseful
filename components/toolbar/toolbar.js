import React from 'react'
import PropTypes from 'prop-types'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import BurgerMenu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import { grey400, grey900 } from 'material-ui/styles/colors'
import Search from '../search/search'

let { bool, func } = PropTypes

export default class ToolBar extends React.Component {
  static propTypes = {
    isOpen: bool,
    toggleSideNav: func
  }

  render() {
    let { toggleSideNav, isOpen } = this.props
    return (
      <MuiThemeProvider>
        <Toolbar style={{ background: 'white' }}>
          <ToolbarGroup firstChild>
            <IconButton touch onClick={toggleSideNav}>
              {isOpen ? (
                <ChevronLeft color={grey400} hoverColor={grey900} />
              ) : (
                <ChevronRight color={grey400} hoverColor={grey900} />
              )}
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <Search />
            <ToolbarSeparator />
            <IconMenu
              iconButtonElement={
                <IconButton touch>
                  <BurgerMenu color={grey400} hoverColor={grey900} />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download PDF" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    )
  }
}
