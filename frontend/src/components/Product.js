import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
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
      <div className="restaurant-card__price">
          <h4>{product.price}</h4>
      </div>
    </a>
    /*
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
    */
  )
}

export default Product
