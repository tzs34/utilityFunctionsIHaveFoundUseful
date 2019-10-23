import React from 'react'
import {Cell} from 'fixed-data-table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'

const DateCell = (props) => {

    const {rowIndex, field, data, onCheck} = props;

    return (
        <Cell style={{ backgroundColor: 'white'}}>

            {data[rowIndex][field]}

        </Cell>
    )

}

export default DateCell
