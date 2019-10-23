import  React, {Component, PropTypes}  from 'react'
import  Calendar from './Calendar'
import FlatButton from 'material-ui/FlatButton'
import DialogWindow from 'material-ui/Dialog'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {keyCodes} from '.././../helpers/app-utils'
import {getClasses} from '.././../helpers/css-utils'

class DatePickerDialog extends Component {
    
    static propTypes = {
        initialDate: PropTypes.object,
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        onAccept: PropTypes.func,
        onShow: PropTypes.func,
        onDismiss: PropTypes.func
    }

    constructor (props) {
        super(props)

        this.state = {isCalendarActive: false }

        this._dismiss = this._dismiss.bind(this)

    }

    show () {

        this.refs.dataPickerDialogWindow.show()

    }

    _dismiss () {

        this.refs.dataPickerDialogWindow.open = false

    }

    _onSelectedDate (){

        if(this.props.autoOk) {
            setTimeout(this._handleOKTouchTap.bind(this), 300)
        }

    }

    _handleCancelTouchTap () {

        this.dismiss()

    }

    _handleOKTouchTap () {

        this.dismiss()
        if (this.props.onAccept) {

            this.props.onAccept(this.refs.calendar.getSelectedDate())

        }

    }

    _handleDialogShow () {

        this.setState({
            isCalendarActive: true
        })

        if (this.props.onShow) {

            this.props.onShow()

        }

    }

    _handleDialogDismiss () {

        this.setState({
            isCalendarActive: false
        })

        if (this.props.onDismiss) {

            this.props.onDismiss()

        }

    }

    _handleWindowKeyUp (e) {

        if (this.refs.dataPickerDialogWindow.isOpen()) {

            switch (e.keyCode) {

                case keyCodes.ENTER:
                    this._handleOKTouchTap()
                    break
            }

        }

    }

    render () {

        let {
            initialDate,
            openDialog,
            closeDialog,
            dateSelected,
            ...other
        } = this.props

        let  classes = getClasses(this.props.className, 'date-picker-dialog')

        let actions = [
            <FlatButton
                key={0}
                label="Cancel"
                secondary={true}
                onClick={closeDialog} />,
            <FlatButton
                key={1}
                label="OK"
                secondary={true}
                onTouchTap={dateSelected} />
        ];

        return (

            <div>
                <MuiThemeProvider>
                    <DialogWindow {...other}
                                  ref='dataPickerDialogWindow'
                                  className={classes}
                                  actions={actions}
                                  contentClassName='date-picker-dialog-window'
                                  onDismiss={this._handleDialogDismiss}
                                  onShow={this._handleDialogShow}
                                  repositionOnUpdate={false}
                                  open={openDialog}
                                  bodyStyle={{width: 500}}
                                  contentStyle={{width: 500}}>
                        <Calendar
                            ref='calendar'
                            minDate={this.props.minDate}
                            maxDate={this.props.maxDate}
                            onSelectedDate={this._onSelectedDate}
                            initialDate={this.props.initialDate}
                            isActive={this.state.isCalendarActive}
                            mode={this.props.mode} />
                    </DialogWindow>
                </MuiThemeProvider>
            </div>
        )

    }

}

export default DatePickerDialog
