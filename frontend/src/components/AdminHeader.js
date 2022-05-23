import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import juan_icon from '../assets/img/icons/juan-nav.png'


const AdminHeader = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header className='header'>
      <Navbar className='header__nav' expand='lg' collapseOnSelect>
        <Container className='.header__nav--container-desktop '>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src={juan_icon} height="40" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/profile'>
                <Nav.Link className='header-nav__links'>
                  <i className='fas fa-user'></i> Profile
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/admin/userlist'>
                <Nav.Link className='header-nav__links'>
                  <i className='fas fa-users'></i> Users
                </Nav.Link>
              </LinkContainer>
              <div onClick={logoutHandler}>
                <Nav.Link className='header-nav__links'>
                  <i className='fas fa-right-from-bracket'></i> Logout
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default AdminHeader
