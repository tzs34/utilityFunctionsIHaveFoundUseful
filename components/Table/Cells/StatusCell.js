import React from 'react'
import {Cell} from 'fixed-data-table'
import IconButton from 'material-ui/IconButton'
import Done from 'material-ui/svg-icons/action/done'
import InProgress from 'material-ui/svg-icons/editor/mode-edit'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'

const StatusCell = (props) => {

    const {rowIndex, field, data, onClick} = props;

    return (
        <Cell style={{ backgroundColor: 'white'}}>
            <MuiThemeProvider>
                {
                    data[rowIndex][field] === 'done' ?
                        <IconButton onClick={onClick}>
                           <Done />
                        </IconButton>
                        :
                        <IconButton onClick={onClick}>
                            <InProgress />
                        </IconButton>

                }
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Divider />
            </MuiThemeProvider>
        </Cell>
    )

}

export default StatusCell
