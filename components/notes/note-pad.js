import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import NotePad from './notes'

import './draft.css'

let { bool, func } = PropTypes

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}

const NotePadSlideBar = ({ isOpen, width, notes, toggleNotePadFunc, deleteNote, saveNote }) => (
  <Drawer anchor="left" open={isOpen} onClose={toggleNotePadFunc}>
    <NotePad
      notes={notes}
      width={width}
      onDelete={deleteNote}
      onSave={saveNote}
      onClose={toggleNotePadFunc}
    />
  </Drawer>
)

NotePadSlideBar.propTypes = {
  isOpen: bool,
  toggleNotePadFunc: func,
  deleteNote: func,
  saveNote: func
}
export default withStyles(styles)(NotePadSlideBar)
