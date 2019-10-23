import React from 'react'
import PropTypes from 'prop-types'
import { FlexRow } from '../../styles'
import { withStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'

let { array, func, object } = PropTypes

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 10,
    height: 40
  },
  icon: {
    margin: theme.spacing.unit
  }
})

const BreadCrumbList = FlexRow.extend`
  justify-content: flex-start;
  width: ${props => props.width}px;

  & span:last-child {
    text-decoration: underline;
    color: #757575;
  }
`
const BreadCrumbItem = FlexRow.extend`
  justify-content: flex-start;
  width: 40%;
`

const BreadCrumb = ({ crumbs, onClick, classes, width = 400 }) => {
  let len = crumbs.length - 1

  return (
    <BreadCrumbList width={width}>
      {crumbs.map((crumb, index) => {
        if (index === 0) {
          return (
            <BreadCrumbItem key={crumb}>
              <div>
                <ArrowBackIcon className={classes.icon} />
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => {
                    onClick(crumb)
                  }}
                >
                  {crumb}
                </Button>
              </div>
              <div>
                <ChevronRightIcon className={classes.icon} />
              </div>
            </BreadCrumbItem>
          )
        }
        if (index > 0 && index < len) {
          return (
            <BreadCrumbItem key={crumb}>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => {
                    onClick(crumb)
                  }}
                >
                  {crumb}
                </Button>
              </div>
              <div>
                <ChevronRightIcon className={classes.icon} />
              </div>
            </BreadCrumbItem>
          )
        }
        if (index === len) {
          return (
            <BreadCrumbItem key={crumb}>
              <div>
                <Button className={classes.button} disabled>
                  {crumb}
                </Button>
              </div>
            </BreadCrumbItem>
          )
        }
      })}
    </BreadCrumbList>
  )
}

BreadCrumb.propTypes = {
  crumbs: array,
  onClick: func,
  classes: object
}
export default withStyles(styles)(BreadCrumb)
