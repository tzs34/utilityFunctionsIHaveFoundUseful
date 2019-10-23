import React, {PropTypes} from 'react'
import { Column, Cell } from 'fixed-data-table'
import { SlidingPanel, ResponsiveFixedTableWrapper, SelectCell, SearchBox, ProjectHeaderCell} from '../../components'

const ProjectsTable = (props) => {

    let projectsSize = props.data.length

    return (
        <SlidingPanel isOpen={props.isOpen} togglePanel={props.togglePanel} title='Projects'>
        <div>
            <div className='search-projects-box'>
                <SearchBox
                    hintText='Filter Projects'
                    type='filter'
                    styles={{width: 150}}
                    hintStyle={{'fontSize': 12}}
                    onChange={(text) => (props.onFilter(text))}/>
            </div>
            <ResponsiveFixedTableWrapper
                rowHeight={50}
                rowsCount={projectsSize}
                width={200}
                headerHeight={50}>
                <Column
                    header={<ProjectHeaderCell
                        sortAsc={true}
                        filter={false}
                        label='Projects'
                        field='project'
                        showAddToCart={props.showAddToCart}
                        addToCart={props.addToCart}
                        onSort={(key, direction) => (props.onSort(key, direction))}/>}
                        cell={<SelectCell field='project' data={props.data}
                                      onCheck={props.onProjectSelected}/>}
                    width={200}/>
            </ResponsiveFixedTableWrapper>
        </div>
        </SlidingPanel>
    )

}

ProjectsTable.propTypes = {
    data: PropTypes.array.isRequired,
    showAddToCart: PropTypes.bool,
    onFilter: PropTypes.func,
    onSort: PropTypes.func,
    onProjectSelected: PropTypes.func,
    addToCart: PropTypes.func
}

export default ProjectsTable
