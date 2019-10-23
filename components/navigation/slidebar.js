import React from 'react'
import Drawer from '@material-ui/core/Drawer'

const SlideBar = ({ direction, isOpen, children }) => (
  <Drawer anchor={direction} open={isOpen}>
    {isOpen && <div>{children}</div>}
  </Drawer>
)

export default SlideBar
