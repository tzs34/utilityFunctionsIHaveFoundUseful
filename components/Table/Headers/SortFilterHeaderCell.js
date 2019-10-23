import React, { Component, PropTypes }  from 'react'
import {Cell} from 'fixed-data-table'
import {grey500, grey900} from 'material-ui/styles/colors'
import SortIcon from 'material-ui/svg-icons/content/sort'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const { bool, func, string } = PropTypes

class SortFilterHeaderCell extends Component {

    static propTypes = {
        onSortChange: func,
        onFilter: func,
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
        this._onFilterChange = this._onFilterChange.bind(this)

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

    _onFilterChange () {

        if (this.props.onFilter) {

            this.props.onFilter(this.props.field)

        }

    }

    render () {

        let {label, filter, sort, onFilter, onSort, field, sortAsc, ...props } = this.props

        let classes = 'sort-icon rotate ' + this.state.classes

        return (
            <Cell {...props} style={{backgroundColor: 'white'}}>
                <div className='sort-cell'>
                    <div className='sort-cell-content'>
                        {label}
                    </div>
                    <div className='sort-icon' onClick={this._onFilterChange}>
                        { filter &&
                            < MuiThemeProvider >
                                <FilterIcon style={{width: 15, height: 15}} color={grey500} hoverColor={grey900}/>
                            </MuiThemeProvider>
                        }
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
