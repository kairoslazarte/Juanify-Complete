import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [filter, setFilter] = useState('All')

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.first_name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setFirstName(user.first_name)
        setMiddleName(user.middle_name)
        setLastName(user.last_name)
        setPhone(user.phone)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, first_name: firstName, middle_name: middleName, last_name: lastName, phone, email, password }))
    }
  }

  return (
    <Container className='pt-10'>
      <div className='profile-user'>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
              <div className='profiler-user__name-email'>
                <Form.Group controlId='firstName'>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='middleName'>
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter middle name'
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                  <Form.Label>Contact/mobile number</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter contact/mobile'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <div className='profiler-user__password'>
                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <button type='submit' className='bg-yellow-500 font-medium transition duration-200 text-white py-3 px-4 hover:opacity-60'>
                Update
              </button>
          </Form>
        )}
      </div>

      {!userInfo.isSeller && !userInfo.isAdmin && (
        <div className='profile-orders'>
        <h2 className='pb-2'>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <>
           <div className='restaurant-categories'>
              <div className='restaurant-categories__container'>
                  <button className={filter == 'All' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('All')}>All</button>
                  <button className={filter == 'Delivered' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('Delivered')}>Delivered</button>
                  <button className={filter == 'Paid' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('Paid')}>Paid</button>
                  <button className={filter == 'Complete' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('Complete')}>Complete</button>
              </div>
            </div>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>RESTAURANT</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                filter == 'All' ? (
                  <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.restaurantName}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                  </tr>
                ) : filter == 'Delivered' ? (
                  order.isDelivered && (
                    <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.restaurantName}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                    </tr>
                  )
                ) : filter == 'Paid' ? (
                  order.isPaid && (
                    <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.restaurantName}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                    </tr>
                  )
                ) : (
                  order.isComplete && (
                    <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.restaurantName}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                    </tr>
                  )
                )
              ))}
            </tbody>
          </Table>
          </>
         
        )}
        </div>
      )}
    </Container>
  )
}

export default ProfileScreen
