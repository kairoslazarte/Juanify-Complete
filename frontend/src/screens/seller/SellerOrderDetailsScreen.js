import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {
  getOrderDetails,
  payOrder,
  completeOrder,
  updateStatus,
  markAsPaid
} from '../../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants'


const status = [
    { id: 1, status: 'Order recieved', code: 'or'},
    { id: 2, status: 'In the kitchen', code: 'itk' },
    { id: 3, status: 'On the way', code: 'otw' },
    { id: 4, status: 'Delivered', code: 'done' }
]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SellerOrderDetailsScreen = ({ match, history, location }) => {
    const [newState, setNewState] = useState('Eto na dapat')
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    var status_number

    if (!loading) {
        order.isRecieved == true && (status_number = 0)
        order.isOnTheKitchen == true && (status_number = 1)
        order.isOnTheWay == true && (status_number = 2)
        order.isDelivered == true && (status_number = 3)
    }

    const [selected, setSelected] = useState(status[0])


    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

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
    }, [dispatch, orderId, successPay, successDeliver, order])

    const markPaidHandler = (paymentResult) => {
        dispatch(markAsPaid(order))
    }

    const completeOrderHandler = () => {
        dispatch(completeOrder(order))
    }

    localStorage.setItem("update", "0");
    const updateOrderStatusHandler = (orderStatus) => {
        dispatch(updateStatus(order, {orderStatus}))
        localStorage.setItem("update", "1");
        window.location.reload()
    }
    
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className='order-details container pt-10'>
            <h1 className='break-all'>Order {order._id}</h1>
            <Row>
                <Col md={8} className="order-details__container">
                <ListGroup variant='flush'>
                    <ListGroup.Item className='flex flex-col space-y-2'>
                    <h2 className='pb-2'>Shipping</h2>
                    <p>
                        <strong>Name: </strong> {order.user.first_name} {order.user.middle_name && order.user.middle_name} {order.user.last_name}
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
                    ) : order.isRecieved ? (
                        <Message variant='warning'>Order recieved</Message>
                    ) : order.isOnTheKitchen ? (
                        <Message variant='info'>Order is in the kitchen</Message>
                    ) : order.isOnTheWay ? (
                        <Message variant='warning'>Order is on the way</Message>
                    ) : (
                        <Message variant='success'>
                        Order is Complete. Delivered on {order.deliveredAt}
                        </Message>
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
                    <h2>Order Items</h2>
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
                                <Link to={`/product/${item.product}`} className="font-bold md:pt-0 pt-4 sm:text-lg">
                                    {item.name}
                                </Link>
                                </Col>
                                <Col md={4}>
                                    <p className='md:pt-0 pt-2'>
                                        {item.qty} x {item.price}php = {item.qty * item.price}php
                                    </p>
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
                <Card className="order-summary__card">
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
                    {/* <ListGroup.Item>
                        <Row>
                        <Col>Tax</Col>
                        <Col>{order.taxPrice}php</Col>
                        </Row>
                    </ListGroup.Item> */}
                    <ListGroup.Item>
                        <Row>
                        <Col>Total</Col>
                        <Col>{order.totalPrice}php</Col>
                        </Row>
                    </ListGroup.Item>
                    {loadingDeliver && <Loader />}
                    {!loading && (
                        !order.isComplete ? (
                            <>
                               {userInfo &&
                                   userInfo.isSeller && (
                                    <>
                                        <h4 className='order-details__status--label'>Update order status:</h4>
                                        <ListGroup.Item>
                                            <Button
                                            type='button'
                                            className={order.isRecieved == true ? 'order-details__status-btn--active btn btn-block':  'order-details__status-btn--non-active btn btn-block'}
                                            onClick={() => updateOrderStatusHandler('or')}
                                            >
                                            Order recieved
                                            </Button>
                                        </ListGroup.Item>
                                    </>
                               )}
                                {userInfo &&
                                   userInfo.isSeller && (
                                   <ListGroup.Item>
                                       <Button
                                       type='button'
                                       className={order.isOnTheKitchen == true ? 'order-details__status-btn--active btn btn-block':  'order-details__status-btn--non-active btn btn-block'}
                                       onClick={() => updateOrderStatusHandler('itk')}
                                       >
                                       In the Kitchen
                                       </Button>
                                   </ListGroup.Item>
                               )}
                                {userInfo &&
                                   userInfo.isSeller && (
                                   <ListGroup.Item>
                                       <Button
                                       type='button'
                                       className={order.isOnTheWay == true ? 'order-details__status-btn--active btn btn-block':  'order-details__status-btn--non-active btn btn-block'}
                                       onClick={() => updateOrderStatusHandler('otw')}
                                       >
                                       Out for delivery
                                       </Button>
                                   </ListGroup.Item>
                               )}
                                {userInfo &&
                                   userInfo.isSeller && (
                                   <ListGroup.Item>
                                       <Button
                                       type='button'
                                       className={order.isDelivered == true ? 'order-details__status-btn--active btn btn-block':  'order-details__status-btn--non-active btn btn-block'}
                                       onClick={() => updateOrderStatusHandler('done')}
                                       >
                                       Delivered
                                       </Button>
                                   </ListGroup.Item>
                               )}
   
                              
                               {userInfo &&
                                   userInfo.isSeller && 
                                    !order.isPaid && (
                                    <>
                                        <h4 className='order-details__status--label'>Payment status:</h4>
                                        <ListGroup.Item>
                                            <Button
                                            type='button'
                                            className='order-details__mark-pay-btn btn btn-block'
                                            onClick={markPaidHandler}
                                            >
                                            Mark As Paid
                                            </Button>
                                        </ListGroup.Item>
                                   </>
                               )}
   
                              
                               {userInfo &&
                                   userInfo.isSeller &&
                                   order.isDelivered == true &&
                                   order.isPaid &&
                                   (
                                   <>
                                       <h4 className='order-details__status--label'>Close/Complete order</h4>
                                       <ListGroup.Item>
                                           <Button
                                           type='button'
                                           className='btn btn-info btn-block'
                                           onClick={completeOrderHandler}
                                           >
                                           Complete Order
                                           </Button>
                                       </ListGroup.Item>
                                   </>
                               )}
                           </>
                        ) : (
                            <>
                                <h4 className='order-details__status--label'>ORDER IS COMPLETE</h4>
                            </>
                        )
                    )} 
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SellerOrderDetailsScreen
