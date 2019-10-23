import React, { Component, PropTypes }  from 'react'
import {Cell} from 'fixed-data-table'
import {grey500, grey900} from 'material-ui/styles/colors'
import SortIcon from 'material-ui/svg-icons/content/sort'
import IconButton from 'material-ui/IconButton';
import AddToCartIcon from 'material-ui/svg-icons/content/add'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const { bool, func, string } = PropTypes

class SortFilterHeaderCell extends Component {

    static propTypes = {
        onSortChange: func,
        addToCart: func,
        sortAsc: bool,
        children: string,
        field: string,
        filter: bool,
        sort: bool
    }

    static defaultProps ={

        filter: true,
        sort: true
    }

    constructor (props) {

        super(props)

        this._onSortChange = this._onSortChange.bind(this)
        this._onAddToCart = this._onAddToCart.bind(this)

        this.state = {
            direction: this.props.sortAsc,
            classes: ''
        }

    }

    componentDidMount () {

        this.setState({
            direction: !this.props.sortAsc,
            classes: 'rotate180'

        })

    }

    _onSortChange (e) {

        e.preventDefault()

        if (this.props.onSort) {

            this.props.onSort (
                this.props.field,
                this.state.direction

            )

        }

        this.setState({
            direction: !this.state.direction,
            classes: this.state.direction ? 'rotate180' : 'rotate-180'

        })

    }

    _onAddToCart () {

        if (this.props.showAddToCart && this.props.addToCart) {

            this.props.addToCart()

        }

    }

    render () {

        let {label, filter, sort, addToCart, showAddToCart, onSort, field, sortAsc, ...props } = this.props

        let classes = 'sort-icon rotate ' + this.state.classes
        let iconStyle = {width: 25, height: 25, strokeWidth: 5}
        iconStyle = showAddToCart ? {...iconStyle, ...{fill: 'green'}} :  {...iconStyle, ...{fill: 'red'}}

        return (
            <Cell {...props} style={{backgroundColor: 'white'}}>
                <div className='flex-row'>
                    <div className='add-to-cart' onClick={this._onAddToCart}>
                        < MuiThemeProvider >
                            <IconButton tooltip={'Add Project'} iconStyle={iconStyle} style={{margin: -10, }}>
                            <AddToCartIcon color={grey900}/>
                            </IconButton>
                        </MuiThemeProvider>
                    </div>

                    <div className={classes} onClick={this._onSortChange}>
                        { sort &&
                        < MuiThemeProvider >
                            <SortIcon style={{width: 15, height: 15}} color={grey500} hoverColor={grey900}/>
                        </MuiThemeProvider>
                        }
                    </div>
                </div>

            </Cell>
        )

    }

}

export default SortFilterHeaderCell
