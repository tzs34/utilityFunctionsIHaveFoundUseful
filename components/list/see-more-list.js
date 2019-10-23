import React, { Component } from 'react'
import { FadeIn } from '../../styles'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 200,
    height: 40
  }
})

class SeeMoreList extends Component {
  state = {
    toggle: false
  }

  toggleList = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    let { classes, items, listSize, renderFunction, showBtn = true } = this.props
    let { toggle } = this.state
    let label = toggle ? 'Show Less' : 'Show More'
    let data = toggle ? items : items.slice(0, listSize)
    return (
      <div>
        <FadeIn>
          {data.map((item, index) => {
            return <FadeIn key={index}>{renderFunction(item, index)}</FadeIn>
          })}
          <div>
            {showBtn && (
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.toggleList}
              >
                {label}
              </Button>
            )}
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default withStyles(styles)(SeeMoreList)
