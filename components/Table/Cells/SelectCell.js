import React from 'react'
import {Cell} from 'fixed-data-table'
import Checkbox from 'material-ui/Checkbox'
import ActionChecked from 'material-ui/svg-icons/toggle/radio-button-checked'
import ActionUnChecked from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'

const styles = {
        marginBottom: 16,
        width: 200
}

const SelectCell = (props) => {

    const {rowIndex, field, data, onCheck} = props

    return (
        <Cell style={{ backgroundColor: 'white'}}>
            <MuiThemeProvider>
                <Checkbox
                    checkedIcon={<ActionChecked />}
                    uncheckedIcon={<ActionUnChecked />}
                    label={data[rowIndex][field]}
                    value={data[rowIndex][field]}
                    style={styles}
                    onCheck={onCheck}/>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Divider />
            </MuiThemeProvider>
        </Cell>
    )

}

export default SelectCell
