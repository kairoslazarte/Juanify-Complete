import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const RestaurantCard = ({ product }) => {
  return (
    <a href={`/product/${product._id}`} className="restaurant-card">
      <div className="restaurant-card__img">
        <img src={product.image} />
      </div>
      <div className="restaurant-card__name">
          <h3>{product.name}</h3>
      </div>
      <div className="restaurant-card__rating">
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
      </div>
    </a>
  )
}

export default RestaurantCard
