import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { getRestaurantProfile } from '../actions/userActions'
import juan_icon from '../assets/img/icons/juan-nav.png'


const Header = ({ history }) => {
  const [restaurantName, setRestaurantName] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantProfile = useSelector((state) => state.restaurantProfile)
  const { loading, error, restaurant } = restaurantProfile

  useEffect(() => {
    if (!restaurant || !restaurant.name) {
        dispatch(getRestaurantProfile('restaurant/profile'))
    } else {
        setRestaurantName(restaurant.name)
    }
}, [dispatch, history, userInfo, restaurant])

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
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/food'>
                <Nav.Link className='header-nav__links'>
                  <i className='fas fa-utensils'></i> Browse
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/partner-with-us'>
                <Nav.Link className='header-nav__links'>
                  <i className='fas fa-hands-helping'></i> Partner with Us
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link className='header-nav__links'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='header-nav__links'>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isSeller && (
                <NavDropdown title={restaurantName} id='sellermenu'>
                  <LinkContainer to='/partner/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/partner/products'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/partner/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
