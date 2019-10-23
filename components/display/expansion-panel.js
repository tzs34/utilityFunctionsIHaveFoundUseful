import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled, { keyframes } from 'styled-components'

const { array, object, string } = PropTypes

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
  `
const Fade = styled.div`
  width: 100%;
  animation: ${props => (props.in ? `${fadeIn} 0.5s linear` : `${fadeOut} 0.5s linear`)};
`

const styles = theme => ({
  root: {
    zIndex: 20000
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    marginTop: 0,
    marginLeft: 120,
    color: '#512DA8'
  },
  subheading: {
    marginLeft: 10,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: 0,
    color: '#0071BC'
  },
  typo: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: 2,
    padding: 10,
    color: '#757575',
    background: '#ECEFF1',
    textAlign: 'left'
  }
})

function CustomExpansionPanel(props) {
  let { classes, title, text, subtitle, iconColor, open } = props
  return (
    <div>
      <ExpansionPanel expanded={open} style={{ boxShadow: 'none' }} className={classes.root}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ fill: iconColor }} />}
          style={{ height: 40 }}
        >
          <Fade in={open}>
            <Typography className={classes.heading}>{title}</Typography>
            <Typography className={classes.subheading}>{subtitle}</Typography>
          </Fade>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Fade>
            <Typography className={classes.typo}>
              {text.map(str => {
                return <span key={str}>{str}</span>
              })}
            </Typography>
          </Fade>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

CustomExpansionPanel.propTypes = {
  classes: object.isRequired,
  title: string.isRequired,
  text: array.isRequired
}

CustomExpansionPanel.defaultProps = {
  subtitle: 'Read more ...',
  iconColor: '#512DA8'
}
export default withStyles(styles)(CustomExpansionPanel)
