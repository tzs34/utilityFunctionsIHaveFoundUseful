import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { borderAnimation } from '../../styles'

let { array } = PropTypes

const Nav = styled.div`
  background: transparent;
`
const NavList = styled.ul`
  padding: 15px;
  font-size: 1.5em;
  & a {
    text-decoration: none;
    color: #fff;
    position: relative;
    display: inline-block;
    padding: 5px 5px;
    margin-left: 1em;
    overflow: hidden;

    &:after {
      display: block;
      border-radius: 1px;
      content: '';
      left: 0;
      bottom: -10px;
      height: 2px;
      background: #ffffff;
      transform: translateX(-110%);
    }

    &:hover {
      text-decoration: none;

      &:after {
        animation: ${borderAnimation} 0.5s 1 ease normal;
        transform: translateX(0);
      }
    }
  }
`
const Navigation = props => {
  return (
    <Nav>
      <NavList>
        {props.items.map((item, index) => {
          return (
            <li key={index} id={index}>
              <a href="#">{item}</a>
            </li>
          )
        })}
      </NavList>
    </Nav>
  )
}

Navigation.propTypes = {
  items: array
}

export default Navigation
