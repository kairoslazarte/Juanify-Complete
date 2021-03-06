import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [applyingSeller, setApplyingSeller] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.first_name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFirstName(user.first_name)
        setMiddleName(user.middle_name)
        setLastName(user.last_name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsSeller(user.isSeller)
        setApplyingSeller(user.applyingForSeller)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, first_name: firstName, middle_name: middleName, last_name: lastName, email, isAdmin, isSeller }))
  }

  return (
    <div className='container pt-10'>
      <Link to='/admin/userlist' className='my-3 btn btn-light'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {applyingSeller == true && (
              <div className='user-edit__seller'>
                <h4>Accept this user to be a Seller for Juanify?</h4>

                <div className='user-edit__seller-btns'>
                  <button className='user-edit__seller-btn--yes' onClick={() => setIsSeller(true)}>Accept</button>
                  <button className='user-edit__seller-btn--no' onClick={() => setIsSeller(false)}>Decline</button>
                </div>
              </div>
            )}

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

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
           

            <button type='submit' className='bg-blue-700 font-medium transition duration-200 text-white py-3 px-4 hover:opacity-60 mt-4'>
              Update
            </button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
