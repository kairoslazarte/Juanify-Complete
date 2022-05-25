import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createProduct } from '../../actions/restaurantActions'

const SellerCreateProductScreen = ({history}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

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
        createProduct({
            name,
            price,
            image,
            category,
            countInStock,
        })
        )
        history.push(`/partner/products`)
        window.location.reload()
    }

    return ( 
        <div className='container pt-10'>
        <Link to='/partner/products' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer className='seller-create-product'>
            <h1>Create new product</h1>
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
                    Add
                </Button>
            </Form>
        </FormContainer>
    </div>
    )
}

export default SellerCreateProductScreen