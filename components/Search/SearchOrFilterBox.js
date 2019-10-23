import React, { Component, PropTypes }from 'react';
import {TextField, IconButton} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const defaultStyles =  {
    width: 100,
    height: 40,
    border: 'solid 1px black',
    borderRadius: 5,
    buttonWidth: 40,
    buttonHeight: 40,
    buttonPadding: 5,
    iconWidth: 30,
    iconHeight: 30
}

class SearchOrFilterBox extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['search', 'filter']),
        onChange: PropTypes.func,
        styles: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            border: PropTypes.string,
            borderRadius: PropTypes.number,
            buttonWidth: PropTypes.number,
            buttonHeight: PropTypes.number,
            buttonPadding: PropTypes.number,
            iconWidth: PropTypes.number,
            iconHeight: PropTypes.number
        }),
        hintText: PropTypes.string,
        hintStyle: PropTypes.object
    }

    static defaultProps = {
    type: 'search'
    }

    render () {

        let {onChange, type, hintText, hintStyle} = this.props,
            styles = Object.assign(defaultStyles, this.props.styles)

        const divStyle = {'width': styles.width, 'height': styles.height, 'border': styles.border, 'borderRadius': styles.borderRadius}
        divStyle.width += styles.iconWidth + 5

        const iconStyle = {'width': styles.iconWidth, 'height': styles.iconHeight}
        const iconBtnStyle = {'padding': 0, 'width': styles.buttonWidth, 'height': styles.buttonHeight}

        return (
            <div style={divStyle}>
                <MuiThemeProvider>
                    <IconButton iconStyle={iconStyle} style={iconBtnStyle}>
                        { type === 'search' ? <SearchIcon /> : <FilterIcon /> }
                    </IconButton>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <TextField ref={(text) => (this.input = text)} hintStyle={hintStyle} hintText={hintText} name='search' style={{'width': styles.width - 10, 'height': styles.height, 'position': 'absolute'}} onChange={() => onChange(this.input.getValue())}/>
                </MuiThemeProvider>
            </div>
        )

    }

}

export default SearchOrFilterBox
