import React, {Component, PropTypes} from 'react'
import DateDisplay from'./DateDisplay'
import CalendarMonth from './CalendarMonth'
import CalendarToolbar from './CalendarToolbar'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {getFirstDayOfMonth, addDays, addMonths, cloneDate, getWeekArray, keyCodes} from '.././../helpers/app-utils'
import {getClasses} from '.././../helpers/css-utils'

class Calendar extends Component{

    static propTypes =  {
        className: PropTypes.string,
        initialDate: PropTypes.object,
        isActive: PropTypes.bool,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onSelectedDate: PropTypes.func
    }

    static defaultProps = {
            initialDate: new Date(),
            maxDate: null,
            minDate: null

    }

    constructor (props) {
        
        super(props)

        this.state = {
            
            displayDate: getFirstDayOfMonth(this.props.initialDate),
            selectedDate: this.props.initialDate,
            transitionDirection: 'left'
            
        }

        this._addDisplayDate = this._addDisplayDate.bind(this)
        this._setSelectedDate = this._setSelectedDate.bind(this)
        this._getSelectedDate = this._getSelectedDate.bind(this)
        this._handleDayTouchTap = this._handleDayTouchTap.bind(this)
        
    }

    componentWillReceiveProps (nextProps) {
        
        if (nextProps.initialDate !== this.props.initialDate) {
            
            let d = nextProps.initialDate || new Date()
            this.setState({
                displayDate: getFirstDayOfMonth(d),
                selectedDate: d
            })
            
        }
        
    }
    
    _getSelectedDate () {
        
        return this.state.selectedDate
        
    }

    _addDisplayDate (m) {
        
        let newDisplayDate = cloneDate(this.state.displayDate)
        newDisplayDate.setMonth(newDisplayDate.getMonth() + m)
        this._setDisplayDate(newDisplayDate)
        
    }

    _addSelectedDays (days) {
        
        this._setSelectedDate(addDays(this.state.selectedDate, days))
        
    }

    _addSelectedMonths (months) {
        
        this._setSelectedDate(addMonths(this.state.selectedDate, months))
        
    }

    _setDisplayDate (d, newSelectedDate) {

        //{startDate: this.props.initialDate, endDate: null},


        let newDisplayDate = getFirstDayOfMonth(d)

        let direction = newDisplayDate > this.state.displayDate ? 'left' : 'right'

        if (newDisplayDate !== this.state.displayDate) {
            
            this.setState({
                displayDate: newDisplayDate,
                transitionDirection: direction,
                selectedDate: newSelectedDate || this.state.selectedDate
                
            })
            
        }
        
    }

    _setSelectedDate (d) {

        let newDisplayDate = getFirstDayOfMonth(d)

        if (newDisplayDate !== this.state.displayDate) {
            
            this._setDisplayDate(newDisplayDate, d)
            
        } else {
            
            this.setState({
                selectedDate: d
            })
            
        }
        
    }

    _handleDayTouchTap (date) {

        this._setSelectedDate(date)
        
    }

    _handleLeftTouchTap () {
        
        this._addDisplayDate(-1)
        
    }

    _handleRightTouchTap () {
        
        this._addDisplayDate(1)
        
    }

    _handleWindowKeyDown (e) {

        if (this.props.isActive) {

            switch (e.keyCode) {

                case keyCodes.UP:
                    if (e.shiftKey) {

                        this._addSelectedMonths(-1)

                    } else {

                        this._addSelectedDays(-7)

                    }

                    break

                case keyCodes.DOWN:
                    if (e.shiftKey) {

                        this._addSelectedMonths(1)

                    } else {

                        this._addSelectedDays(7)

                    }
                    break

                case keyCodes.RIGHT:
                    if (e.shiftKey) {

                        this._addSelectedMonths(1)

                    } else {

                        this._addSelectedDays(1)

                    }
                    break

                case keyCodes.LEFT:
                    if (e.shiftKey) {

                        this._addSelectedMonths(-1)

                    } else {

                        this._addSelectedDays(-1)

                    }
                    break
            }
            
        }
        
    }

    render () {

        let weekCount = getWeekArray(this.state.displayDate).length
        let classes = getClasses(this.props.className, 'date-picker-calendar', {
            'is-4week': weekCount === 4,
            'is-5week': weekCount === 5,
            'is-6week': weekCount === 6
        })

        let initialDate = this.state.selectedDate,
            displayDate = this.state.displayDate

        return (
            <div className={classes}>

                <DateDisplay
                    className='date-picker-calendar-date-display'
                    mode={this.props.mode}
                    selectedDate={initialDate} />

                <div
                    className='date-picker-calendar-container'>
                    <CalendarToolbar
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                        displayDate={displayDate}
                        onLeftTouchTap={() => (this._addDisplayDate(-1))}
                        onRightTouchTap={() => (this._addDisplayDate(1))} />

                    <ul className='date-picker-calendar-week-title'>
                        <li className='date-picker-calendar-week-title-day'>S</li>
                        <li className='date-picker-calendar-week-title-day'>M</li>
                        <li className='date-picker-calendar-week-title-day'>T</li>
                        <li className='date-picker-calendar-week-title-day'>W</li>
                        <li className='date-picker-calendar-week-title-day'>T</li>
                        <li className='date-picker-calendar-week-title-day'>F</li>
                        <li className='date-picker-calendar-week-title-day'>S</li>
                    </ul>

                    <CSSTransitionGroup
                        transitionName='calendar-transition'
                        transitionEnterTimeout ={500}
                        transitionLeaveTimeout={500}
                        direction={this.state.transitionDirection}>
                        <CalendarMonth
                            minDate={this.props.minDate}
                            maxDate={this.props.maxDate}
                            key={displayDate.toDateString()}
                            displayDate={displayDate}
                            onDayTouchTap={this._handleDayTouchTap}
                            selectedDate={initialDate} className='transition-slide-in-child' />
                    </CSSTransitionGroup>
                </div>
            </div>
        )
        
    }
    
}

export default Calendar
