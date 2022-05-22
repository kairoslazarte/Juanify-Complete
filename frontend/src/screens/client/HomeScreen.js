import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import RestaurantCard from '../../components/RestaurantCard'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import LocationBox from '../../components/LocationBox'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listRestaurants } from '../../actions/restaurantActions'

const HomeScreen = ({ match }) => {
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
      {!keyword ? (
        <section id="home-jumbotron" className="home-jumbotron">
          <ProductCarousel />
        </section>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
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
          <Row>
            
          </Row>
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

export default HomeScreen


/**
 *   <section id="about-us" className="about-us">
        <div className="about-us__container">
          <div className="about-us__col--one">
            <h1>ABOUT JUANIFY</h1>
            <p>Juanify is an AI delivery of services platform that aggregates essential services, making user experience from search to completion of services simple and easy.</p>
          </div>
          <div className="about-us__col--two">
            <h1>WHY JUANIFY?</h1>
            <p>Juanify is an AI delivery of services platform that aggregates essential services, making user experience from search to completion of services simple and easy.</p>
          </div>
        </div>
      </section>
 */