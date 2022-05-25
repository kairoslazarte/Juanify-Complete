import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { updateProduct } from '../../actions/restaurantActions'

const SellerProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const restaurantProfile = useSelector((state) => state.restaurantProfile)
    const { loading, error, restaurant } = restaurantProfile

    const { products } = restaurant

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (products) {
                for (var i = 0, len = products.length; i < len; i++) {
                   if (products[i]._id === productId) {
                        setName(products[i].name)
                        setPrice(products[i].price)
                        setCategory(products[i].category)
                        setCountInStock(products[i].countInStock)
                        setImage(products[i].image)
                   }
                }
            }
        }
    }, [userInfo, products, productId])

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
        dispatch(
        updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            countInStock,
        })
        )
        window.location.reload();
    }
    return (
        <div className='container pt-10'>
            <Link to='/partner/products' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit/Update Product</h1>
                {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
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
            
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
            
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
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
            
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                            type='number'
                            placeholder='Enter countInStock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
            
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default SellerProductEditScreen