import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let { array, number } = PropTypes

const PaginationContainer = styled.ul`
  padding: 1em;

  & li {
    display: inline;
    padding: 0.2em;
  }
`

const TextButton = styled.button`
  background-color: white;
  color: #355c7d;
  border-color: #3e98c7;
  padding: 8px 12px;
  font-size: 1em;
  min-width: 40px;
  min-height: 40px;
  box-sizing: border-box;
  line-height: 1em;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  transition-duration: 0.4s;
  margin: 0.2em;

  &:hover {
    background-color: #3e98c7;
    color: white;
  }

  &:disabled {
    color: #eaeaea;
    border-color: #eaeaea;
  }

  &:disabled button:hover {
    color: #eaeaea;
    border-color: #eaeaea;
  }
`

class Pagination extends Component {
  state = {
    pager: {}
  }

  static propTypes = {
    items: array,
    pageSize: number
  }

  componentDidMount() {
    let { items } = this.props
    if (items && items.length > 0) {
      this.setPage(this.props.initialPage)
    }
  }

  setPage = page => {
    var { items, pageSize } = this.props
    var pager = this.state.pager

    if (page < 1 || page > pager.totalPages) {
      return
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize)

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

    // update state
    this.setState({ pager: pager })

    // call change page function in parent component
    this.props.onChangePage(pageOfItems)
  }

  getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 10

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize)

    var startPage, endPage
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i)

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    let { pager } = this.state

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }

    return (
      <PaginationContainer>
        <li>
          <TextButton
            onClick={() => this.setPage(1)}
            disabled={pager.currentPage === 1 ? 'disabled' : ''}
          >
            First
          </TextButton>
        </li>
        First
        <li>
          <TextButton
            onClick={() => this.setPage(pager.currentPage - 1)}
            disabled={pager.currentPage === 1 ? 'disabled' : ''}
          >
            Previous
          </TextButton>
        </li>
        <li>
          <TextButton
            onClick={() => this.setPage(pager.currentPage + 1)}
            disabled={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          >
            Next
          </TextButton>
        </li>
        Next
        <li>
          <TextButton
            onClick={() => this.setPage(pager.totalPages)}
            disabled={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          >
            Last
          </TextButton>
        </li>
      </PaginationContainer>
    )
  }
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

Pagination.defaultProps = {
  initialPage: 1,
  pageSize: 10
}

export default Pagination

// {pager.pages.map((page, index) =>
//     <li key={index}>
//         <NumberButton onClick={() => this.setPage(page)} disabled={pager.currentPage === page ? 'active' : ''}>{page}</NumberButton>
//     </li>
// )}
