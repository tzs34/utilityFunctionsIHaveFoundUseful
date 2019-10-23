import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dc from 'dc'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import Undo from 'material-ui/svg-icons/content/undo'
import { grey700, grey900 } from 'material-ui/styles/colors'
import { tooltipStyle } from '../../styles'

let { func } = PropTypes

const DataCountContainer = styled.div`
  display: flex;
  width: 400px;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  justify-content: center;
  color: #3299cc;
  font-weight: bold;
  .dc-chart {
    font-size: 1.25em;
    padding: 0.2em;
  }
`

class DataDisplay extends Component {
  loadDisplay = container => {
    if (container) {
      this.display = dc.dataCount(container)
      this.display.redraw = this.redraw
      this.renderChart(this.display)
    }
  }

  renderChart = display => {
    let { crossfilter, dimension, group, labels } = this.props

    if (this.display) {
      display.resetSvg()
    }

    display
      .dimension(crossfilter[dimension])
      .group(crossfilter[group])
      .html(labels)
    display.render()
  }

  redraw = () => {
    this.renderChart(this.display)
  }

  render() {
    let { onReset } = this.props

    return (
      <DataCountContainer>
        <div ref={this.loadDisplay} />
        <MuiThemeProvider>
          <IconButton
            touch
            onClick={onReset}
            tooltip="reset data"
            tooltipPosition="bottom-left"
            tooltipStyles={tooltipStyle}
          >
            >
            <Undo color={grey700} hoverColor={grey900} />
          </IconButton>
        </MuiThemeProvider>
      </DataCountContainer>
    )
  }
}

DataDisplay.propTypes = {
  onReset: func
}

export default DataDisplay
