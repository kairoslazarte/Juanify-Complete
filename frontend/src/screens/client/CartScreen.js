import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap'
import Message from '../../components/Message'
import { removeFromCart } from '../../actions/cartActions'

const CartScreen = ({ history }) => {
  if(!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // const cart = localStorage.getItem('cartItems')
  // ? JSON.parse(localStorage.getItem('cartItems'))
  // : []

  // cart = useSelector((state) => state.cart)


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Container className="pt-10">
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <>
              <h1>Your Order/s at <span className='text-blue-700'>{cartItems[0].restaurant}</span></h1>
              <br/>
              <br/>
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3} className="cart-screen-details__name">
                        <Link to={`/restaurant/${item.restaurant_id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2} className="cart-screen-details">php {item.price}</Col>
                      <Col md={2} className="cart-screen-details">x {item.qty}</Col>
                      <Col md={2} className="cart-screen-details">
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>
        <Col md={4} className="pt-10 md:pt-0">
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                Php
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  type='button'
                  className='w-full bg-red-500 text-white py-3 px-5 transition duration-200 hover:opacity-60'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
