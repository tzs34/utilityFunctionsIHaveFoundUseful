import React from 'react'
import {Cell} from 'fixed-data-table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'

const TextCell = (props) => {

    const {rowIndex, field, data} = props

    return (
        <Cell style={{ backgroundColor: 'white' }}>
           <div>
               {data[rowIndex][field]}
           </div>
        </Cell>
    )

}

export default TextCell
