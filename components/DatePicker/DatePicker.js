import React, {Component, PropTypes} from 'react'
import DatePickerDialog from './DatePickerDialog'
import {grey500, grey900} from 'material-ui/styles/colors'
import DateIcon from 'material-ui/svg-icons/action/date-range'
import {formatDate} from '.././../helpers/app-utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {getClasses} from '.././../helpers/css-utils'

class DatePicker extends Component{

   static propTypes =  {
        className: PropTypes.string,
        defaultDate: PropTypes.object,
        format: PropTypes.string,
        formatDate: PropTypes.func,
        mode: PropTypes.oneOf(['portrait', 'landscape', 'inline']),
        onFocus: PropTypes.func,
        onTouchTap: PropTypes.func,
        onChange: PropTypes.func,
        onShow: PropTypes.func,
        onDismiss: PropTypes.func,
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        autoOk: PropTypes.bool
    }

    static defaultProps = {
            formatDate: formatDate,
            minDate: null,
            maxDate: null,
            autoOk: false
    }

    constructor (props) {

       super(props)

        this.state = {
            date: this.props.defaultDate,
            dialogDate: new Date()
        }

        this._handleInputTouchTap = this._handleInputTouchTap.bind(this)

    }

    getDate () {

        return this.state.date

    }

    getFormattedDate () {

        var d = moment(this.state.date)
        return this._formatDate(d)

    }

    setDate (d) {

        this.setState({
            date: d
        })
        this.refs.input.setValue(this.props.formatDate(d))

    }

    _formatDate (d){

        if (this.props.format) {

            return d.format(this.props.format)

        }

        return d.format('YYYY/MM/DD')

    }

    _handleDialogAccept (d) {
        this.setDate(d)

        var d2 = this._formatDate(moment(d))

        if (this.props.onChange) {

            this.props.onChange(null, d2)

        }

    }

    _handleInputFocus (e) {

        e.target.blur()

        if (this.props.onFocus) {

            this.props.onFocus(e)

        }

    }

    _handleInputTouchTap (e) {

        this.setState({
            dialogDate: this.getDate()
        })

        this.refs.dialogWindow.show()

        if (this.props.onTouchTap) {

            this.props.onTouchTap(e)

        }

    }

    _handleWindowKeyUp () {
        // TO DO: open the dialog if input has focus
    }

    render () {

        let {
            formatDate,
            format,
            mode,
            onFocus,
            onTouchTap,
            onShow,
            handleOpenDatePicker,
            closeDialog,
            minDate,
            maxDate,
            autoOk,
            openDialog,
            ...other
        } = this.props;

        let classes = getClasses(this.props.className, 'date-picker')

        let defaultInputValue;
        if (this.props.defaultDate) {
            defaultInputValue = this.props.formatDate(this.props.defaultDate);
        }

        return (
            <div className={classes}>
                <MuiThemeProvider>
                    <DateIcon style={{width: 15, height: 15}} color={grey500} hoverColor={grey900} onClick={handleOpenDatePicker} />
                </MuiThemeProvider>
                <DatePickerDialog
                    ref='dialogWindow'
                    minDate={minDate}
                    maxDate={maxDate}
                    autoOk={autoOk}
                    initialDate={this.state.dialogDate}
                    onAccept={this._handleDialogAccept}
                    openDialog={openDialog}
                    onShow={onShow}
                    closeDialog={closeDialog}
                    open={openDialog} />
            </div>

        )

    }

}

export default DatePicker
