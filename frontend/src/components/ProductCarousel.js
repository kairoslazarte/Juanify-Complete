import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import juanifyIcon from '../assets/img/icons/juanify.png'
import foodDeliveryImg from '../assets/img/food-delivery.png'
import hassleFreeImg from '../assets/img/hassle-free.png'

const ProductCarousel = () => {
  return (
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