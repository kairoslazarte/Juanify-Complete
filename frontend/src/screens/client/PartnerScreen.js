import React, { useState, useEffect } from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import JuanifyIcon from '../../assets/img/icons/juanify.png'
import { register } from '../../actions/userActions'

const PartnerScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, phone, password))
    }
  }

    return (
    <div className='partner-screen'>
        <div className='partner-screen-bg'>
      <div className='partner-screen-col-one'>
        <div className='partner-screen-col-one-a'/>
      </div>
      <div className='partner-screen-grid-one'>
        <div className='partner-screen-col-one-b'>
          <div className='partner-screen-col-one-size'>
            <h2>Partner With Us</h2>
            <p className='partner-screen-desc'>
             Fill out the form to be one of our merchants
            </p>
            <dl>
              <div>
                <dt>Postal address</dt>
                <dd>
                  <p>Davao City, Philippines</p>
                </dd>
              </div>
              <div className='partner-screen-phone-num'>
                <dt>Phone number</dt>
                <dd className='partner-screen-icons'>
                  <PhoneIcon className='partner-screen-set-icons' aria-hidden="true"/>
                  <span className='partner-screen-icons-spans'>+63 925 664 8806</span>
                </dd>
              </div>
              <div className='partner-screen-email'>
                <dt>Email</dt>
                <dd className='partner-screen-icons'>
                  <MailIcon className='partner-screen-set-icons' aria-hidden="true"/>
                  <span className='partner-screen-icons-spans'>support@example.com</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="partner-screen-col-two-bg">
            <div className="rartner-screen-col-two-size">
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

                <Form.Group controlId='phone'>
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='restaurant'>
                  <Form.Label>Restaurant name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter restaurant name'
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
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

                <button
                    type="submit"
                    className="register-screen_sign-button"
                >
                  Apply now!
                </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}


export default PartnerScreen

