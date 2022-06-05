import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import RestaurantCard from '../../components/RestaurantCard'
import Meta from '../../components/Meta'
import { listRestaurants, listTopRestaurants, listRecentlyOrdered } from '../../actions/restaurantActions'
import ProductCarousel from '../../components/ProductCarousel'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const AllRestaurantsScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantTopRated = useSelector((state) => state.restaurantTopRated)
  const { loading: topRated_loading, error: topRated_error, restaurants: topRated_restaurants } = restaurantTopRated

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants, page, pages } = restaurantList

  const restaurantRecentlyOrdered = useSelector((state) => state.restaurantRecentlyOrdered)
  const { loading: loadingRecent, error: errorRecent, restaurants: recentlyOrdered } = restaurantRecentlyOrdered

  useEffect(() => {
    dispatch(listRestaurants(keyword, pageNumber))
    dispatch(listTopRestaurants())
    dispatch(listRecentlyOrdered())
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
              <section id="home-restaurants" className="home-restaurants pt-4">
                <h1>Most <span className='text-red-500'>popular</span>/<span className='text-blue-700'>top-rated</span> restaurants</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 xl:gap-6 pt-8">
                  {topRated_restaurants.map((top_restaurant) => (
                    <RestaurantCard restaurant={top_restaurant} key={top_restaurant._id} />
                  ))}
                </div>
              </section>
            </>
          )}
          {userInfo && (
            loadingRecent ? (
              <Loader />
            ) : errorRecent ? (
              <Message variant='danger'>{errorRecent}</Message>
            ) : (
              recentlyOrdered.length > 0 && (
                <section id="home-restaurants" className="home-restaurants py-0">
                  <h1 className='pb-8'>RECENTLY ORDERED FROM</h1>
                  <Carousel responsive={responsive}>
                    {recentlyOrdered.map((recent_restau) => (
                        <RestaurantCard restaurant={recent_restau} key={recent_restau._id} />
                    ))}
                  </Carousel>
                </section>
              )
            )
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
