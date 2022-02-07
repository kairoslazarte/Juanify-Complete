import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product'
import RestaurantCard from '../../components/RestaurantCard'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import LocationBox from '../../components/LocationBox'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions'

const HomeScreen = ({ match }) => {
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
      {!keyword ? (
        <section id="home-jumbotron" className="home-jumbotron">
          <ProductCarousel />
        </section>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <section id="home-location" className="home-location">
        <LocationBox />
      </section>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <section id="home-restaurants" className="home-restaurants">
            <h1>Suggested Restaurants for you:</h1>
            <div className="home-restaurants__container">
              {products.map((product) => (
                <RestaurantCard product={product} key={product._id} />
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