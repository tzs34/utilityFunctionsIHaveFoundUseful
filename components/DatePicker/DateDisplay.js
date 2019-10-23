import  React, {Component, PropTypes} from 'react'
import {getDayOfWeek, getShortMonth } from  '.././../helpers/app-utils'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {getClasses} from '.././../helpers/css-utils'

class  DateDisplay extends Component{
    

    static propTypes =  {
        className: PropTypes.string,
        selectedDate: PropTypes.object.isRequired,
        weekCount: PropTypes.number
    }

    static getDefaultProps = {
        
            weekCount: 4
    }
    
    constructor (props){
        super(props)
        
        this.state = {

            transitionDirection: 'up'
        }

    }

    componentWillReceiveProps (nextProps) {
        
        let direction;

        if (nextProps.selectedDate !== this.props.selectedDate) {

            direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down'
            this.setState({
                transitionDirection: direction
            })

        }

    }

    render () {
        
        let {
            selectedDate,
            ...other
        } = this.props

        let classes = getClasses(this.props.className, 'date-picker-date-display')

        let dayOfWeek = getDayOfWeek(selectedDate)
        let month = getShortMonth(selectedDate)
        let day = selectedDate.getDate()
        let year = selectedDate.getFullYear()

        return (
            <div {...other} className={classes}>

                <CSSTransitionGroup
                    transitionName='switch'
                    transitionEnterTimeout ={500}
                    transitionLeaveTimeout={100}
                    className='date-picker-date-display-dow'
                    component='div'
                    direction={this.state.transitionDirection}>
                    <div key={dayOfWeek} className='transition-slide-in-child'>{dayOfWeek}</div>
                </CSSTransitionGroup>

                <div className='date-picker-date-display-date'>

                    <CSSTransitionGroup
                        transitionName='switch'
                        transitionEnterTimeout ={500}
                        transitionLeaveTimeout={100}
                        className='date-picker-date-display-month'
                        component='div'
                        direction={this.state.transitionDirection}>
                        <div key={month} className='transition-slide-in-child'>{month}</div>
                    </CSSTransitionGroup>

                    <CSSTransitionGroup
                        transitionName='switch'
                        transitionEnterTimeout ={500}
                        transitionLeaveTimeout={100}
                        className='date-picker-date-display-day'
                        component='div'
                        direction={this.state.transitionDirection}>
                        <div key={day} className='transition-slide-in-child'>{day}</div>
                    </CSSTransitionGroup>

                    <CSSTransitionGroup
                        transitionName='switch'
                        transitionEnterTimeout ={500}
                        transitionLeaveTimeout={100}
                        className='date-picker-date-display-year'
                        component='div'
                        direction={this.state.transitionDirection}>
                        <div key={year} className='transition-slide-in-child'>{year}</div>
                    </CSSTransitionGroup>

                </div>

            </div>
        );
    }

}

export default DateDisplay
