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

  const policies = [
    {
      name: 'Free returns',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
      description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
      name: 'Same day delivery',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
      description:
        'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
      name: 'All year discount',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
      description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
      name: 'For the planet',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
      description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
    },
  ]

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
          <section aria-labelledby="policies-heading" className="policies_screen-section">
            <h2 id="policies-heading" className="policies_screen-h2">
              Our policies
            </h2>

            <div className="policies_screen-container">
              <div className="policies_screen-grid">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="policies_screen-name"
                  >
                    <div className="policies_screen-img-container">
                      <div className="policies_screen-flow-root">
                        <img className="policies_screen-margin" src={policy.imageUrl} alt="" />
                      </div>
                    </div>
                    <div className="policies_screen-name-container">
                      <h3 className="policies_screen-h3">{policy.name}</h3>
                      <p className="policies_screen-description">{policy.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <section id="home-restaurants" className="home-restaurants">
            <div className='user-location-input'>
              <h1>Delivering to <span className='user-location-input__location'>{sessionStorage.getItem('user_location')}</span></h1>
              <a href='/input-location'>Change location</a>
            </div>
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