import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {  getRestaurantProfile, updateRestaurantProfile } from '../../actions/userActions'
import axios from 'axios'
import { SELLER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const SellerProfileScreen = ({ history }) => {
    const [message, setMessage] = useState(null)

    const [restaurantName, setRestaurantName] = useState('')
    const [city, setCity] = useState('')
    const [lon, setLon] = useState('')
    const [lat, setLat] = useState('')
    const [street, setStreet] = useState('')
    const [barangay, setBarangay] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const restaurantProfile = useSelector((state) => state.restaurantProfile)
    const { loading, error, restaurant } = restaurantProfile

    const restaurantUpdateProfile = useSelector((state) => state.restaurantUpdateProfile)
    const { success } = restaurantUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!restaurant || !restaurant.name || success) {
                dispatch({ type: SELLER_UPDATE_PROFILE_RESET })
                dispatch(getRestaurantProfile('restaurant/profile'))
            } else {
                setRestaurantName(restaurant.name)
                setCity(restaurant.location.city)
                setStreet(restaurant.location.street)
                setBarangay(restaurant.location.barangay)
                setZipCode(restaurant.location.zipCode)
                setLon(restaurant.location.long)
                setLat(restaurant.location.lat)
                setDescription(restaurant.description)
                setImage(restaurant.image)
            }
        }
    }, [dispatch, history, userInfo, restaurant, success])

   
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
        const config = {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }

        const { data } = await axios.post('/api/upload', formData, config)

        setImage(data)
        setUploading(false)
        } catch (error) {
        console.error(error)
        setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRestaurantProfile({ 
            restaurantName,
            city,
            street,
            barangay,
            zipCode,
            lon,
            lat,
            description,
            image 
        }))
    }

    return (
        <div className='seller-profile container pt-10'>
            <h2>RESTAURANT PROFILE</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
            <Loader />
            ) : error ? (
            <Message variant='danger'>{error}</Message>
            ) : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='restaurant'>
                    <Form.Label>Restaurant name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter restaurant name'
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <div className='seller-profile-form__address'>
                    <div className='seller-profile-form__address_city-street-barangay'>
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
                    
                    <div className='seller-profile-form__address_lat-lon'>
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

                <Form.Group controlId='description'>
                    <Form.Label>Restaurant description (optional)</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter restaurant description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Restaurant Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                </Form.Group>

                <button type='submit' className='seller-profile__update-btn'>
                Update
                </button>
            </Form>
            )}
        </div>
    )
}

export default SellerProfileScreen
