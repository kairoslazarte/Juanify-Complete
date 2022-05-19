import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import {
    listRestaurantDetails,
    createRestaurantReview
} from '../../actions/restaurantActions'
import { RESTAURANT_CREATE_REVIEW_RESET } from '../../constants/restaurantConstants'

const RestaurantScreen = ({ history, match }) => {
    const dispatch = useDispatch()
    const [filterProducts, setFilterProducts] = useState('')
    const [qty, setQty] = useState(0)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurant } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const restaurantReviewCreate = useSelector((state) => state.restaurantReviewCreate)
    const {
        success: successRestaurantReview,
        loading: loadingRestaurantReview,
        error: errorRestaurantReview,
    } = restaurantReviewCreate

    console.log(restaurant)

    useEffect(() => {
        if (successRestaurantReview) {
            setRating(0)
            setComment('')
        }
        if (!restaurant._id || restaurant._id !== match.params.id) {
          dispatch(listRestaurantDetails(match.params.id))
          dispatch({ type: RESTAURANT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match, successRestaurantReview])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createRestaurantReview(match.params.id, {
            rating,
            comment,
            })
        )
    }
    
    const { products } = restaurant
    
    const cartItems = []

    const categories = []

    products.map((product) => {
        if (product.category == product.category) {
            categories.push(product.category)
        }
    })

    const product_category = []
        
    for(let i of categories) {
        if(product_category.indexOf(i) === -1) {
            product_category.push(i)
        }
    }

    console.log(product_category)

    const addToCartHandler = (name, price, image, prod_id) => {
        console.log(prod_id)
        if (cartItems.length === 0) {
            cartItems.push(
                {
                    restaurant: restaurant.name,
                    restaurant_id: restaurant._id,
                    id: prod_id,
                    name: name,
                    price: price,
                    qty: 1,
                    image: image,
                }
            )
        }
        else {
            const cartItem = cartItems.findIndex((cart_item => cart_item.id == prod_id))
            console.log(cartItem)
            if (cartItem >= 0) {
                cartItems[cartItem].qty += 1
            }
            else {
                cartItems.push(
                    {
                        restaurant: restaurant.name,
                        restaurant_id: restaurant._id,
                        id: prod_id,
                        name: name,
                        price: price,
                        qty: 1,
                        image: image,
                    }
                ) 
            }
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        console.log(cartItems)
        alert('Added to cart!')
    }

    return (
        <section className="restaurant">
            <>
                {restaurant ? (
                    <>
                        <div className='restaurant-heading'>
                            <div className='restaurant-heading__container'>
                                <h1 className='restaurant-heading__head'>{restaurant.name} - {restaurant.location && (<>{restaurant.location.city}, {restaurant.location.barangay}</>)}</h1>
                                <div className='user-location-input'>
                                    <h1>Delivering to <span className='user-location-input__location'>{sessionStorage.getItem('user_location')}</span></h1>
                                    <a href='/input-location'>Change location</a>
                                </div>
                                {/* <div className='restaurant-categories'>
                                    <div className='restaurant-categories__container'>
                                        {product_category.map((prod_cat) => (
                                            <button className={filterProducts == prod_cat ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilterProducts(prod_cat)}>{prod_cat}</button>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="restaurant-product__container">
                            {products.map((product) => (
                                <div className="restaurant-product">
                                    <div className="restaurant-product__img">
                                        <img src={product.image} />
                                    </div>
                                    <div className="restaurant-product__name">
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className="restaurant-product__rating">
                                        <p>{product.price} php</p>
                                    </div>
                                    <button
                                    onClick={() => addToCartHandler(product.name, product.price, product.image, product._id)}
                                    className='restaurant-product__add-to-cart--btn'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='restaurant-reviews'>
                            <h2>Reviews</h2>
                            {restaurant.reviews && (
                                <>
                                    {restaurant.reviews.length === 0 && <Message>No Reviews</Message>}
                                    <ListGroup variant='flush'>
                                        {restaurant.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                        <h2>Write a Customer Review</h2>
                                        {successRestaurantReview && (
                                            <Message variant='success'>
                                            Review submitted successfully
                                            </Message>
                                        )}
                                        {loadingRestaurantReview && <Loader />}
                                        {errorRestaurantReview && (
                                            <Message variant='danger'>{errorRestaurantReview}</Message>
                                        )}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <br/>
                                            <Button
                                                disabled={loadingRestaurantReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                            </Form>
                                        ) : (
                                            <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                            </Message>
                                        )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            )}
                        </div>
                    </>
                )
                : (
                    <Loader/>
                )
                }
            </>
        </section>
    )
}

export default RestaurantScreen