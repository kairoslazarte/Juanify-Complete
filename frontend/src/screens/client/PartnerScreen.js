import React, { useState, useEffect } from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import JuanifyIcon from '../../assets/img/icons/juanify.png'
import { getUserDetails } from '../../actions/userActions'
import { login } from '../../actions/userActions'
import { createRestaurant } from '../../actions/restaurantActions'

const PartnerScreen = ({ location, history }) => {
    const [userID, setUserID] = useState('')
    const [applied, setApplied] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    const [city, setCity] = useState('')
    const [lon, setLon] = useState('')
    const [lat, setLat] = useState('')
    const [street, setStreet] = useState('')
    const [barangay, setBarangay] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails

    const restaurantCreate = useSelector((state) => state.restaurantCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        restaurant: createdRestaurant,
    } = restaurantCreate

    const user_info = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : []
   
    useEffect(() => {
        if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
        } else {
        setApplied(user.applyingForSeller)
        setUserID(user_info._id)
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(login(email, password))
            dispatch(createRestaurant({
                userID,
                restaurantName,
                city,
                street,
                barangay,
                zipCode,
                lon,
                lat
            }))
            if(!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }
    }

    return (
        !userInfo 
        ?
        <>
            {error ? 
            <Message variant='danger'>{error}</Message>
            :
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
                    </div>
                </div>
                <h1 className='partner-screen__login-msg'>Please <a href='/login'>sign in</a> or <a href='/register'>sign up</a> first to apply</h1>
            </div>
            }
        </>
        :
        <div className='partner-screen'>
            <div className='partner-screen-bg'>
                <div className='partner-screen-col-one'>
                    <div className='partner-screen-col-one-a'/>
                </div>
                <div className='partner-screen-grid-one'>
                    <div className='partner-screen-col-one-b'>
                        <div className='partner-screen-col-one-size'>
                            {applied != true ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <h2>You already applied to partner with us</h2>
                                    <p className='partner-screen-desc'>
                                        We already are reviewing your application. Thank you for your patience!
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {applied != true && (
                        <div className="partner-screen-col-two-bg">
                            <div className="partner-screen-col-two-size">
                        
                            {message && <Message variant='danger'>{message}</Message>}
                            <Form onSubmit={submitHandler}>
                                <div className='partner-screen-form__name-email-phone'>
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
                                </div>

                                <Form.Group controlId='restaurant'>
                                <Form.Label>Restaurant name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter restaurant name'
                                    value={restaurantName}
                                    onChange={(e) => setRestaurantName(e.target.value)}
                                ></Form.Control>
                                </Form.Group>

                                <div className='partner-screen-form__address'>
                                <div className='partner-screen-from__address_city-street-barangay'>
                                    <Form.Group controlId='city'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter restaurant city'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='street'>
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter restaurant street'
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='barangay'>
                                    <Form.Label>Barangay</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter restaurant barangay'
                                        value={barangay}
                                        onChange={(e) => setBarangay(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='zipCode'>
                                    <Form.Label>ZIP/Postal code</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter restaurant zip/postal code'
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group> 
                                </div>
                                
                                <div className='partner-screen-form__address_lat-lon'>
                                    <Form.Group controlId='lon'>
                                    <Form.Label>Longtitude (from google maps)</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter restaurant longtitude'
                                        value={lon}
                                        onChange={(e) => setLon(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='lat'>
                                    <Form.Label>Latitude (from google maps)</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter restaurant latitude'
                                        value={lat}
                                        onChange={(e) => setLat(e.target.value)}
                                    ></Form.Control>
                                    </Form.Group>
                                </div>
                                </div>

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
                    )}
                </div>
            </div>
        </div>
    )
}


export default PartnerScreen