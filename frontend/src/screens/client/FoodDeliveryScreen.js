import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import RestaurantCard from '../../components/RestaurantCard'
import Meta from '../../components/Meta'
import { listRestaurants } from '../../actions/restaurantActions'

const FoodDeliveryScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants, page, pages } = restaurantList

  useEffect(() => {
    dispatch(listRestaurants(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <div className='user-location-input'>
        <h1>Gutom ka na ba ka-<span className='user-location-input__location'>Juan</span>? Kain na!</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
           <section id="home-restaurants" className="home-restaurants">
            <div className="home-restaurants__container">
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant._id} />
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
