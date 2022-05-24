import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import juanifyIcon from '../assets/img/icons/juanify.png'
import foodDeliveryImg from '../assets/img/food-delivery.png'
import hassleFreeImg from '../assets/img/hassle-free.png'
import Loader from './Loader'
import Message from './Message'
import { listTopRestaurants } from '../actions/restaurantActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const restaurantTopRated = useSelector((state) => state.restaurantTopRated)
  const { loading, error, restaurants } = restaurantTopRated

  console.log(restaurants)

  useEffect(() => {
    dispatch(listTopRestaurants())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-danger'>
        <Carousel.Item>
          <Image src={foodDeliveryImg} fluid className='mx-auto' />
          <Carousel.Caption className='carousel-caption'>
            <h2>
              We Deliver right infront of your doorsteps
            </h2>
          </Carousel.Caption>
        </Carousel.Item>

       <Carousel.Item>
          <Image src={hassleFreeImg} fluid />
          <Carousel.Caption className='carousel-caption'>
            <h2>
              Hassle free Booking
            </h2>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image src={juanifyIcon} fluid />
          <Carousel.Caption className='carousel-caption'>
            <h2>
              For all Juans!
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarousel

/*
<Carousel pause='hover' className='bg-danger'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
*/
