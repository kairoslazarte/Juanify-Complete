import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import RestaurantCard from '../../components/RestaurantCard'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions'

const FoodDeliveryScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <div className='user-location-input'>
        <h1>Delivering at <span className='user-location-input__location'>{sessionStorage.getItem('user_location')}</span></h1>
        <a href='/input-location'>Change location</a>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
           <section id="home-restaurants" className="home-restaurants">
            <div className="home-restaurants__container">
              {products.map((product) => (
                <RestaurantCard product={product} key={product._id} />
              ))}
            </div>
          </section>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default FoodDeliveryScreen
