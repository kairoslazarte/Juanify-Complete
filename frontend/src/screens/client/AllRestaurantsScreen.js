import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import RestaurantCard from '../../components/RestaurantCard'
import Meta from '../../components/Meta'
import { listRestaurants, listTopRestaurants } from '../../actions/restaurantActions'
import ProductCarousel from '../../components/ProductCarousel'

const AllRestaurantsScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const restaurantTopRated = useSelector((state) => state.restaurantTopRated)
  const { loading: topRated_loading, error: topRated_error, restaurants: topRated_restaurants } = restaurantTopRated

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants, page, pages } = restaurantList

  useEffect(() => {
    dispatch(listRestaurants(keyword, pageNumber))
    dispatch(listTopRestaurants())
  }, [dispatch, keyword, pageNumber])

  return (
    <Container>
      <Meta />
      <div className='py-10'>
        <ProductCarousel />
      </div>
      {!keyword ? ( 
        <>
          {topRated_loading ? (
            <Loader />
          ) : topRated_error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              
              <section className="restaurants">
                <h1>Most <span className='text-red-500'>popular</span>/<span className='text-blue-700'>top-rated</span> restaurants</h1>
                <div className="restaurants__container">
                  {topRated_restaurants.map((top_restaurant) => (
                    <RestaurantCard restaurant={top_restaurant} key={top_restaurant._id} />
                  ))}
                </div>
              </section>
            </>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <section className="restaurants">
                <h1 className='pt-5'>All <span className='text-blue-700'>available</span> restaurants</h1>
                <div className="restaurants__container">
                  {restaurants.map((restaurant) => (
                    <RestaurantCard restaurant={restaurant} key={restaurant._id} />
                  ))}
                </div>
              </section>
              <div className='restaurants__pagination'>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <section className="restaurants">
                  <h1>Search result/s for <span className='text-red-500'>{keyword}</span></h1>
                  {restaurants.length == 0 ? (
                    <p className='pt-2 text-lg'>Sorry, we can't seem to find anything you're looking for. Can you try again?</p>
                  ) : (
                    <div className="restaurants__container">
                      {restaurants.map((restaurant) => (
                        <RestaurantCard restaurant={restaurant} key={restaurant._id} />
                      ))}
                    </div>
                  )}
                </section>
                <div className='restaurants__pagination'>
                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                  />
                </div>
              </>
            )}
        </>
      )}
    </Container>
  )
}

export default AllRestaurantsScreen
