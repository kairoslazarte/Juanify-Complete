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
import { listMyOrders } from '../../actions/orderActions'

const RestaurantScreen = ({ history, match, location }) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(0)

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurant } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!restaurant._id || restaurant._id !== match.params.id) {
          dispatch(listRestaurantDetails(match.params.id))
          dispatch(listMyOrders())
          dispatch({ type: RESTAURANT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match])
    
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

    const addToCartHandler = (name, price, image, prod_id) => {
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
        alert('Added to cart!')
    }

    return (
        <section className="restaurant container">
            <>
                {restaurant ? (
                    <>
                        <div className='restaurant-heading'>
                            <div className='restaurant-heading__container'>
                                <h1 className='restaurant-heading__head text-center'><span className='text-red-600'>{restaurant.name}</span> - <span className='text-blue-700'>{restaurant.location && (<>{restaurant.location.city}, {restaurant.location.barangay}</>)}</span></h1>
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
                                <div className="restaurant-product" onClick={() => addToCartHandler(product.name, product.price, product.image, product._id)}>
                                    <div className="restaurant-product__img">
                                        <img src={product.image} />
                                    </div>
                                    <div className="restaurant-product__details">
                                        <p className='restaurant-product__name'>{product.name}</p>
                                        <p className='restaurant-product__price'>{product.price} php</p>
                                    </div>
                                    <button
                                    className='restaurant-product__add-to-cart--btn'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    >
                                       <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='restaurant-reviews'>
                            <h2 className='pb-2'>Reviews</h2>
                            {restaurant.reviews && (
                                <>
                                    {restaurant.reviews.length === 0 && <Message>No Reviews</Message>}
                                    <ListGroup variant='flush'>
                                        {restaurant.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <ul className='flex items-center space-x-2 flex-wrap mb-1'>
                                                    <li className='text-xs'>Order/s:</li>
                                                    {review.orderItems.map((order) => (
                                                        <li className='text-xs italic'>{order.name},</li>
                                                    ))}
                                                </ul>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
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