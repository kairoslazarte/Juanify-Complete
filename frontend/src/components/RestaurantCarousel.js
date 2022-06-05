import React from 'react'
import Rating from './Rating'

const RestaurantCarousel = ({ restaurant }) => {
  const rating = Math.round((restaurant.rating + Number.EPSILON) * 100) / 100
  return (
    restaurant.products.length > 0 && (
      <a href={`/restaurant/${restaurant._id}`} className="restaurant-carousel">
        <div className="restaurant-carousel__img">
          <img src={restaurant.image} />
        </div>
        <div className="restaurant-carousel__name">
            <p>{restaurant.name}</p>
        </div>
        <div className="restaurant-carousel__location">
            <p>{restaurant.location.street}, {restaurant.location.city} </p>
        </div>
        <div className="restaurant-carousel__rating">
          <p>{rating}</p>
          <Rating
            value={restaurant.rating}
            text={`${restaurant.numReviews} reviews`}
          />
        </div>
      </a>
    )
  )
}

export default RestaurantCarousel
