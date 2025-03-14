import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantCard from '../../components/RestaurantCard'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listTopRestaurants, listRecentlyOrdered } from '../../actions/restaurantActions'
import JuanifyJumbotron from '../../assets/img/home-jumbo.png'
import { Container } from 'react-bootstrap'
import hassleFreeImg from '../../assets/img/hassle-free.png'
import JuanifyIcon from '../../assets/img/icons/juanify.png'
import aboutUsImg from '../../assets/img/food-delivery.png'
import Efren from '../../assets/img/efren.PNG'
import Joel from '../../assets/img/joel.PNG'
import Rox from '../../assets/img/roxanne.PNG'
import Senibe from '../../assets/img/senibe.PNG'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const people = [
  {
    name: 'Mr. Efren Salvador',
    role: 'CEO',
    imageUrl: Efren,
    bio: 
    React.createElement('ul', { className: 'flex flex-col space-y-2' }, 
      React.createElement('li', {}, 'Entrepreneur - Founder Good Fruit PH'),  
      React.createElement('li', {}, 'Analytical problem solver'),  
      React.createElement('li', {}, 'Data analysis and interpretation'),  
      React.createElement('li', {}, 'Negotiation skills'),  
      React.createElement('li', {}, 'Operations management'),  
      React.createElement('li', {}, 'Business development'),  
    ),
  },
  {
    name: 'Ms. Senibe Salve Dioso',
    role: 'CMO',
    imageUrl: Senibe,
    bio: 
    React.createElement('ul', { className: 'flex flex-col space-y-2' }, 
      React.createElement('li', {}, 'Entrepreneur - ecommerce - EzyPzy'),  
      React.createElement('li', {}, 'Gumshoe Human Resource Consultancy'),  
      React.createElement('li', {}, 'Operations'),  
      React.createElement('li', {}, 'Transport Business - Montalban L300 For Rent'),  
      React.createElement('li', {}, 'Strategic Management'),  
      React.createElement('li', {}, 'Sales and Marketing Strategist'),  
    ),
  },
]

const HomeScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantTopRated = useSelector((state) => state.restaurantTopRated)
  const { loading, error, restaurants } = restaurantTopRated

  const restaurantRecentlyOrdered = useSelector((state) => state.restaurantRecentlyOrdered)
  const { loading: loadingRecent, error: errorRecent, restaurants: recentlyOrdered } = restaurantRecentlyOrdered

  useEffect(() => {
    dispatch(listTopRestaurants())
    dispatch(listRecentlyOrdered())
  }, [dispatch])

  return (
    <>
      <Meta />
      <div>
        <div id="home-jumbotron" className="home-jumbotron bg-black py-40 lg:py-80" style={{backgroundImage: `url('./images/home-jumbotron.png')`}}>
          <div className='flex flex-col space-y-6 mx-auto my-auto h-full'>
              <p className='text-white font-bold text-center text-4xl sm:text-5xl lg:text-8xl'>Welcome to Juanify!</p>
              <p className='text-white font-bold text-center text-2xl sm:text-3xl lg:text-5xl pb-3'>Your favorite local food!</p>
              <a href='/food' className='border-2 border-white rounded-2xl px-6 py-3 text-red-500 bg-white font-bold text-xl sm:text-2xl lg:text-4xl mx-auto hover:opacity-70 transition duration-200 hover:no-underline hover:text-red-500'>Order now!</a>
          </div>
        </div>
      </div>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <section id="home-restaurants" className="home-restaurants">
              <h1>Most <span className='text-red-500'>popular</span>/<span className='text-blue-700'>top-rated</span> restaurants</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 xl:gap-6 pt-8">
                {restaurants.map((restaurant) => (
                  <RestaurantCard restaurant={restaurant} key={restaurant._id} />
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
              <section id="home-restaurants" className="home-restaurants pt-0">
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
      </Container>
      
      <section id="about-us">
        <div className='bg-blue-500 w-full lg:w-[83%] py-10 px-10 transition duration-200 hover:scale-105 rounded-tr-lg'>
          <div className='flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-4 lg:space-x-8'>
              <div>
                <h2 className='text-white'>Juanify history</h2>
                <p className='text-white text-lg'>
                  Juanify started as an idea to aggregate existing app based delivery platform to give the consumer best cost for their logistics.  The sharing of API’s for these platforms is not feasible during the time of inception, we pivoted to aggregate MSME’s with no existing digital footprint.</p>
                <p className='text-white text-lg'>
                  We started to onboard one pilot restaurant in Davao city to test the market.
                </p>
              </div>
              <div>
                <img src={hassleFreeImg} className='lg:w-auto w-40 md:w-60' />
              </div>
          </div>
        </div>

        <div className='bg-red-500 w-full lg:w-[83%] ml-auto py-10 px-10 transition duration-200 hover:scale-105 my-4'>
          <div className='flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-4 lg:space-x-8'>
              <div>
                <img src={JuanifyIcon} className="w-40 md:w-60 lg:w-[245px]" />
              </div>
              <div>
                <h2 className='text-white'>Mission</h2>
                <p className='text-white text-lg'>
                  To unify existing MSME ‘s in one tech platform in the delivery of products and services using AI, Voice Recognition and Image Recognition technology to defined consumers.
                </p>
              </div>
          </div>
        </div>

        <div className='bg-yellow-300 w-full lg:w-[83%] py-10 px-10 transition duration-200 hover:scale-105 rounded-br-lg'>
          <div className='flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-4 lg:space-x-8'>
              <div>
                <img src={aboutUsImg} className="w-40 md:w-60 lg:w-[500px]" />
              </div>
              <div>
                <h2 className='text-black'>About Juanify</h2>
                <p className='text-black text-lg'>
                  Juanify is a technology platform to provide affordable technology solutions to MSME’s by providing them an easy to use platform for their e commerce space. Juanify will provide important data analytics to aid in efficient discussion making.  Juanify will unify the MSME ecosystem to run their business effectively with the use of AI and VR.
                </p>
              </div>
          </div>
        </div>

        <div>
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <p className="text-3xl font-extrabold tracking-tight sm:text-5xl text-blue-700 uppercase text-center underline">Meet our Team</p>

              <ul
                role="list"
                className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
              >
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                      <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                        <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                      </div>
                      <div className="sm:col-span-2 sm:pt-0 pt-40">
                        <div className="space-y-4">
                          <div className="text-lg leading-6 font-medium space-y-1">
                            <h3>{person.name}</h3>
                            <p className="text-indigo-600">{person.role}</p>
                          </div>
                          <div className="text-lg">
                            <p className="text-gray-500">{person.bio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeScreen