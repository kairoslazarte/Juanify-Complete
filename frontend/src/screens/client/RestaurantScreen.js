import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import {
    listRestaurantDetails,
} from '../../actions/restaurantActions'

const RestaurantScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurant } = restaurantDetails

    console.log(restaurant)

    useEffect(() => {
        if (!restaurant._id || restaurant._id !== match.params.id) {
          dispatch(listRestaurantDetails(match.params.id))
        }
    }, [dispatch, history, match])
    
    const { products } = restaurant

    const cartItems = []

    const addToCartHandler = (name, price, image, id) => {
        cartItems.push(
            {
                restaurant: restaurant.name,
                restaurant_id: restaurant._id,
                id: id,
                name: name,
                price: price,
                image: image
            }
        )
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        alert('Added to cart!')
    }

    return (
        <section className="restaurant">
            <>
                {restaurant ? (
                    <>
                        <div className='restaurant-heading__container'>
                            <h1 className='restaurant-heading__head'>{restaurant.name} - {restaurant.location && (<>{restaurant.location.city}, {restaurant.location.barangay}</>)}</h1>
                            <div className='user-location-input'>
                                <h1>Delivering to <span className='user-location-input__location'>{sessionStorage.getItem('user_location')}</span></h1>
                                <a href='/input-location'>Change location</a>
                            </div>
                        </div>
                        <div className="restaurant-container">
                            {products.map((product) => (
                                <div className="restaurant-card">
                                    <div className="restaurant-card__img">
                                        <img src={product.image} />
                                    </div>
                                    <div className="restaurant-card__name">
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className="restaurant-card__rating">
                                        <p>php {product.price}</p>
                                    </div>
                                    <button
                                    onClick={() => addToCartHandler(product.name, product.price, product.image, product._id)}
                                    className='restaurant-card__add-to-cart--btn'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            ))}
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