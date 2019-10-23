import React, {Component, PropTypes} from 'react'
import IconButton from 'material-ui/IconButton'
import {getFullMonth} from '.././../helpers/app-utils'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class CalendarToolbar extends Component{

    static propTypes = {
        displayDate: PropTypes.object.isRequired,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onLeftTouchTap: PropTypes.func,
        onRightTouchTap: PropTypes.func
    }

    static defaultProps = {
        maxDate: null,
        minDate: null
    }   
    
    constructor (props){

        super(props)
        this.state = { transitionDirection: 'up' }

    }

    componentWillReceiveProps (nextProps) {

        let  direction;

        if (nextProps.displayDate !== this.props.displayDate) {

            direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down'
            this.setState({
                transitionDirection: direction
            })

        }

    }

    _isDisabled (direction) {

        let date = this.props.displayDate
        let minDate = this.props.minDate
        let maxDate = this.props.maxDate

        if (direction === 'left' && minDate){

            if (date.getFullYear() < minDate.getFullYear()) {

                return true

            }

            if (date.getFullYear() === minDate.getFullYear()) {

                return date.getMonth() <= minDate.getMonth()

            }

        } else if (direction === 'right' && maxDate) {

            if (date.getFullYear() > maxDate.getFullYear()) {

                return true

            }

            if (date.getFullYear() === maxDate.getFullYear()) {

                return date.getMonth() >= maxDate.getMonth()

            }

        }

        return false

    }

    render () {

        let month = getFullMonth(this.props.displayDate)
        let year = this.props.displayDate.getFullYear()

        let disableLeft = this._isDisabled('left')
        let disableRight = this._isDisabled('right')

        return (
            <div className='date-picker-calendar-toolbar'>

                <CSSTransitionGroup
                    transitionName='switch'
                    transitionEnterTimeout ={500}
                    transitionLeaveTimeout={500}
                    className='date-picker-calendar-toolbar-title' >
                    <div key={month + '_' + year} className='transition-slide-in-child' >{month} {year}</div>
                </CSSTransitionGroup>

                <IconButton style={{position: 'absolute'}} className='date-picker-calendar-toolbar-button-left' onClick={this.props.onLeftTouchTap} >
                    <ChevronLeft />
                </IconButton>

                <IconButton style={{position: 'absolute'}}  className='date-picker-calendar-toolbar-button-right' onClick={this.props.onRightTouchTap} >
                    <ChevronRight />
                </IconButton>

            </div>
        )

    }

}

export default CalendarToolbar
