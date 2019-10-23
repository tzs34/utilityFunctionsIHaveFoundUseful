import React, {Component, PropTypes} from 'react'
import { Column, Cell } from 'fixed-data-table'
import { ResponsiveFixedTableWrapper, DateCell, TextCell, StatusCell, SortFilterHeaderCell, DateSortFilterHeaderCell } from '../../components'

class ProjectsHistoryTable extends Component {

    static propTypes = {
    data: PropTypes.array.isRequired,
    onSortChange: PropTypes.func,
    onFilter: PropTypes.func
    }

    render () {

        const headerStyles = {
            backgroundColor: 'white'
        }

        let {onFilter, onSort, data} = this.props

        let historySize = data.length

        return (
            <div>

                <ResponsiveFixedTableWrapper
                    rowHeight={50}
                    rowsCount={historySize}
                    headerHeight={40} 
                    onRowClick={(e,index)=>( console.log(index))}>
                    <Column
                        header={<SortFilterHeaderCell
                            sortAsc={true}
                            label='Project'
                            field='project'
                            onFilter={onFilter}
                            onSort={onSort} />}
                        cell={<TextCell field='project' data={data}/>}
                        width={125} />
                    <Column
                        header={<Cell style={headerStyles}>{'Number'}</Cell>}
                        cell={<TextCell field='number' data={data}/>}
                        width={80}
                        flexGrow={25}/>
                    <Column
                        header={<Cell style={headerStyles}>{'Selected'}</Cell>}
                        cell={<TextCell field='selected' data={data}/>}
                        width={80}
                        flexGrow={25}/>
                    <Column
                        header={<Cell style={headerStyles}>{'Selection'}</Cell>}
                        cell={<TextCell field='selection' data={data}/>}
                        width={80}
                        flexGrow={25}/>
                    <Column
                        header={<SortFilterHeaderCell
                            sortAsc={true}
                            label='User'
                            field='user'
                            onFilter={onFilter}
                            onSort={onSort} />}
                        cell={<TextCell field='user' data={data}/>}
                        width={125} />
                    <Column
                        header={<SortFilterHeaderCell
                            sortAsc={true} label='status'
                            field='status'
                            onFilter={onFilter}
                            onSort={onSort} />}
                        cell={<StatusCell field='status' data={data}/>}
                        width={125} />
                    <Column
                        header={<DateSortFilterHeaderCell label={'Date'} />}
                        cell={<DateCell field='date' data={data}/>}
                        width={125} />
                    <Column
                        header={<Cell style={headerStyles}>{'Notes'}</Cell>}
                        cell={<TextCell field='notes' data={data}/>}
                        width={225}
                        flexGrow= {200}/>
                </ResponsiveFixedTableWrapper>

            </div>
        )

    }

}

export default ProjectsHistoryTable
