import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Pagination from './pagination'
import { FadeIn } from '../../styles'

let { func, number, string, oneOf } = PropTypes

const Content = styled.div`
  position: relative;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.itemSpacing};
  min-height: ${props => `${props.height}px`};
`

class PaginatedList extends React.Component {
  state = {
    items: [],
    listItems: []
  }

  static propTypes = {
    renderFunction: func,
    direction: oneOf(['column', 'row']),
    height: number,
    itemSpacing: string,
    pageSize: number,
    onItemClick: func
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { items } = nextProps
    if (items && items.length !== prevState.items.length) {
      return { items }
    }
    return null
  }

  onChangePage = listItems => {
    // update state with new page of items
    this.setState({ listItems })
  }

  render() {
    let { items, listItems } = this.state
    let { renderFunction, direction, height, itemSpacing, pageSize, onItemClick } = this.props
    return (
      <Content>
        <ListContainer direction={direction} height={height} itemSpacing={itemSpacing}>
          {listItems.map((item, index) => {
            return <FadeIn key={index}>{renderFunction(item, index, onItemClick)}</FadeIn>
          })}
        </ListContainer>
        <Pagination items={items} onChangePage={this.onChangePage} pageSize={pageSize} />
      </Content>
    )
  }
}

PaginatedList.defaultProps = {
  itemSpacing: 'space-evenly',
  direction: 'column'
}

export default PaginatedList
