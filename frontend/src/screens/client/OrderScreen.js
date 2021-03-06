import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../actions/orderActions'
import { createRestaurantReview } from '../../actions/restaurantActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantReviewCreate = useSelector((state) => state.restaurantReviewCreate)
    const {
        success: successRestaurantReview,
        loading: loadingRestaurantReview,
        error: errorRestaurantReview,
    } = restaurantReviewCreate

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (successRestaurantReview) {
        setRating(0)
        setComment('')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, successRestaurantReview])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  window.setInterval(function(){
      if(localStorage["update"] == "1"){
          localStorage["update"] = "0"
          window.location.reload()
      }
  }, 500);

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
          createRestaurantReview(match.params.id, {
          rating,
          comment,
          restaurantID: order.restaurant,
          orderItems: order.orderItems
          })
      )
      window.location.reload()
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div className='container pt-10'>
      <h1 className='break-all'>Order {order._id}</h1>
      <Row>
        <Col md={8} className='order-details__container py-2'>
          <ListGroup variant='flush'>
            <ListGroup.Item className='flex flex-col space-y-2'>
              <h2 className='pb-2'>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.first_name} {order.user.middle_name} {order.user.last_name}  
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                  <Message variant='success'>
                  Delivered on {order.deliveredAt}
                  </Message>
              ) : order.isOnTheWay ? (
                <Message variant='warning'>Your order is on the way</Message>
              ) : order.isOnTheKitchen ? (
                  <Message variant='info'>Your order is in the kitchen</Message>
              ) : (
                  <Message variant='warning'>Order recieved</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='flex flex-col space-y-2'>
              <h2 className='pb-2'>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod == 'COD' ? 'Cash on Delivery' : 'PayPal'}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not yet paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items at {order.restaurantName}</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {item.name}
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}php = {item.qty * item.price}php
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className='order-summary__card'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice}php</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice}php</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice}php</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid &&  
              order.paymentMethod != 'COD' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {!order.isReviewed &&
              order.isComplete && (
                 <ListGroup.Item className='py-4'>
                 <h4>Write a Customer Review</h4>
                 {successRestaurantReview && (
                     <Message variant='success'>
                         Review submitted successfully
                     </Message>
                 )}
                 {loadingRestaurantReview && <Loader />}
                 {errorRestaurantReview && (
                     <Message variant='danger'>{errorRestaurantReview}</Message>
                 )}
                 {userInfo ? (
                     <Form onSubmit={submitHandler}>
                     <Form.Group controlId='rating'>
                         <Form.Label>Rating</Form.Label>
                         <Form.Control
                         as='select'
                         value={rating}
                         onChange={(e) => setRating(e.target.value)}
                         >
                         <option value=''>Select...</option>
                         <option value='1'>1 - Poor</option>
                         <option value='2'>2 - Fair</option>
                         <option value='3'>3 - Good</option>
                         <option value='4'>4 - Very Good</option>
                         <option value='5'>5 - Excellent</option>
                         </Form.Control>
                     </Form.Group>
                     <Form.Group controlId='comment'>
                         <Form.Label>Comment</Form.Label>
                         <Form.Control
                         as='textarea'
                         row='3'
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                         ></Form.Control>
                     </Form.Group>
                     <br/>
                     <button disabled={loadingRestaurantReview} type='submit' className='bg-blue-700 font-medium transition duration-200 text-white py-3 px-4 hover:opacity-60'>
                         Submit
                     </button>
                     </Form>
                 ) : (
                     <Message>
                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                     </Message>
                 )}
                 </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
