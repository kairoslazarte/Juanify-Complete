import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const RestaurantCard = ({ restaurant }) => {
  console.log(restaurant)
  return (
    restaurant.products.length > 0 && (
      <a href={`/restaurant/${restaurant._id}`} className="restaurant-card">
        <div className="restaurant-card__img">
          <img src={restaurant.image} />
        </div>
        <div className="restaurant-card__name">
            <h3>{restaurant.name}</h3>
        </div>
        <div className="restaurant-card__location">
            <p>{restaurant.location.street}, {restaurant.location.city} </p>
        </div>
        <div className="restaurant-card__rating">
          <Rating
            value={restaurant.rating}
            text={`${restaurant.numReviews} reviews`}
          />
        </div>
      </a>
    )
  )
}

export default RestaurantCard
