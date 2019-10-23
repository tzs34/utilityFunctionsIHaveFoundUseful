import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'

import {getWeekArray, isEqualDate} from '.././../helpers/app-utils'
import {getClasses} from '.././../helpers/css-utils'

const buttonStyle ={
    backgroundColor: 'rgb(0, 151, 167)',
borderRadius: 5,
height: 34,
left: 4,
opacity: 1,
position: 'absolute',
top: 0,
transform: 'scale(1)',
transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
width: 34
}

class CalendarMonth extends Component{
    
    static propTypes=   {
        className: PropTypes.string,
        displayDate: PropTypes.object.isRequired,
        selectedDate: PropTypes.object.isRequired,
        onDayTouchTap: PropTypes.func,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        autoOk: PropTypes.bool
    }

    constructor (props) {

        super(props)

        this._handleDayTouchTap = this._handleDayTouchTap.bind(this)

    }
    
    _isDisabled (day){
        
        let minDate = this.props.minDate
        let maxDate = this.props.maxDate

        if (minDate != null && day < minDate) {

            return true

        }

        if (maxDate != null && day > maxDate) {

            return true

        }

        return false

    }
    
    _getWeekElements () {

        let weekArray = getWeekArray(this.props.displayDate)
        return weekArray.map(function(week, i) {

            return (
                <div
                    key={i} className='date-picker-calendar-month-week'>
                    {this._getDayElements(week)}
                </div>
            )

        }, this)

    }

    _getDayElements (week) {

        return week.map((day, i) =>{
            let selected = isEqualDate(this.props.selectedDate, day)

            return (

                    <FlatButton
                        key={i}
                        label={day ? day.getDate() : ''}
                        disabled={!day}
                        onClick={() => (this._handleDayTouchTap(day))}
                        backgroundColor={selected ? '#939393' : '#ffffff'}
                        style={{width: 35, height: 35, minWidth: 35, paddingRight: 60}}/>

                )

        }, this)

    }

    _handleDayTouchTap (date) {

        if (this.props.onDayTouchTap) {

            this.props.onDayTouchTap(date)

        }

    }
    
    render () {

        let classes = getClasses(this.props.className, 'date-picker-calendar-month')

        return (
            <div className={classes}>
                {this._getWeekElements()}
            </div>
        )

    }

}

export default CalendarMonth
