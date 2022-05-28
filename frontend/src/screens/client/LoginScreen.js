import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import JuanifyIcon from '../../assets/img/icons/juanify.png'
import { login } from '../../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <div className="login-screen_container">
        <div className="login-screen_small-screen-grid">
          <img
            className="login-screen_img "
            src = {JuanifyIcon}
            alt="Workflow"
          />
          <h2 className="login-screen_h2">Sign in to your account</h2>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </div>

        <div className="login-screen_form-container">
          <div className="login-screen_form-container-styles">
            <form className="login-screen_form-spaces" onSubmit={submitHandler}>
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

              <div className="login-screen_flex-items">
                <div className="login-screen_flex-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="login-screen_checkbox"
                  />
                  <label htmlFor="remember-me" className="login-screen_label-remember">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="login-screen_sign-button"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="login-screen_margintop">
              <div className="login-screen_relative">
                <div className="login-screen_absolute">
                  <div className="login-screen_borders" />
                </div>
                <div className="login-screen_relative-flex">
                  <span className="login-screen_px">Don't have an account yet? <a href='/register'>Sign up now.</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginScreen
