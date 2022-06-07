import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listOrders } from '../../actions/orderActions'
import Paginate from '../../components/Paginate'

const SellerOrderlistScreen = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1

    const [filter, setFilter] = useState('All')

    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders, page, pages } = orderList
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        dispatch(listOrders(pageNumber))
    }, [dispatch, history, userInfo])
  
    return (
      <div className='container pt-10'>
        <h1 className='pb-2'>Orders</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
           <div className='restaurant-categories'>
              <div className='restaurant-categories__container'>
                  <button className={filter == 'All' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('All')}>All</button>
                  <button className={filter == 'Delivered' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('Delivered')}>Delivered</button>
                  <button className={filter == 'Paid' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('Paid')}>Paid</button>
                  <button className={filter == 'Complete' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilter('Complete')}>Complete</button>
              </div>
            </div>
           <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                filter == 'All' ? (
                  <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.first_name} {order.user && order.user.last_name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/partner/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                  </tr>
                ) : filter == 'Delivered' ? (
                  order.isDelivered && (
                    <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.first_name} {order.user && order.user.last_name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/partner/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                    </tr>
                  )
                ) : filter == 'Paid' ? (
                  order.isPaid && (
                    <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.first_name} {order.user && order.user.last_name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/partner/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                    </tr>
                  )
                ) : (
                  order.isComplete && (
                    <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.first_name} {order.user && order.user.last_name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Php {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/partner/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                    </tr>
                  )
                )
              ))}
            </tbody>
          </Table>

          <Paginate
            pages={pages}
            page={page}
            atSellerOrders={true}
          />
          </>
        )}
      </div>
    )
}

export default SellerOrderlistScreen