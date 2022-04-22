import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    listRestaurantDetails,
} from '../../actions/restaurantActions'

const RestaurantScreen = ({ history, match }) => {
    console.log(match.params.id)
    const dispatch = useDispatch()

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurant } = restaurantDetails

    useEffect(() => {
        if (!restaurant._id || restaurant._id !== match.params.id) {
          dispatch(listRestaurantDetails(match.params.id))
        }
    }, [dispatch, match])

    return (
        <section className="home-restaurants">
            <h1>You are browsing {restaurant.name}</h1>
            <br/>
            <br/>
            <br/>
            <div className='user-location-input'>
              <h1>Delivering to <span className='user-location-input__location'>{sessionStorage.getItem('user_location')}</span></h1>
              <a href='/input-location'>Change location</a>
            </div>
            <div className="home-restaurants__container">
                {restaurant.products.map((product) => (
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
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RestaurantScreen