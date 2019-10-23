import React from 'react'
import PropTypes from 'prop-types'
import { FlexRow } from '../../styles'

let { array } = PropTypes

const Container = FlexRow.extend`
  border: 1px solid #dee0e4;
  padding: 10px;
  margin: 5px 10px 5px 10px;
  width: 95%;
  div:first-child {
    border-right: 1px solid #dee0e4;
    margin-right: -1px;
  }

  div:last-child {
    border-left: 1px solid #dee0e4;
  }

  a {
    color: black;
    float: left;
    border: 1px solid #dee0e4;
    padding: 10px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  a.active {
    background-color: #212121;
    color: white;
  }

  a:hover:not(.active) {
    background-color: #e2e2e2;
  }

  div:first-child {
    border-radius: 40px 0 0 40px;
  }

  div:last-child {
    border-radius: 0 40px 40px 0;
  }
`

const Pagination = props => {
  return (
    <Container>
      {props.data.map(({ label }) => {
        return (
          <a href="#" key={label}>
            {label}
          </a>
        )
      })}
    </Container>
  )
}

Pagination.propTypes = {
  data: array.isRequired
}

export default Pagination
