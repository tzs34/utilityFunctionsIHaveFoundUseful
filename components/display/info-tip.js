import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

let { string, oneOf, object } = PropTypes

const styles = theme => ({
  tooltip: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    backgroundColor: 'black',
    color: 'whte',
    fontSize: 16,
    padding: 8,
    maxWidth: 400
  }
})

const Content = styled.div`
  font-size: 1em;
`

const InfoTip = ({ classes, icon, id, position, text }) => (
  <Content>
    {icon && (
      <Tooltip classes={{ tooltip: classes.tooltip }} id="id" title={text} placement={position}>
        {createElement(icon)}
      </Tooltip>
    )}
  </Content>
)

InfoTip.propTypes = {
  id: string,
  text: string,
  position: oneOf(['center', 'left', 'right']),
  classes: object
}
export default withStyles(styles)(InfoTip)
