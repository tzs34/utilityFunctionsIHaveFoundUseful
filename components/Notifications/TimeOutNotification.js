import React, {PropTypes}from 'react'
import Snackbar from 'material-ui/Snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const autoHideTimeout = 2000

const TimeoutNotification = (props) => (

    <div>
        <MuiThemeProvider>
            <Snackbar
                open={props.open}
                message={props.message}
                autoHideDuration={autoHideTimeout}
                bodyStyle={ props.status ? {backgroundColor: '#00cc00'} : {backgroundColor: '#ff0000'} }/>
        </MuiThemeProvider>
    </div>
)

TimeoutNotification.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string
}

export default TimeoutNotification
