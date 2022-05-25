import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantCard from '../../components/RestaurantCard'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listTopRestaurants } from '../../actions/restaurantActions'
import JuanifyJumbotron from '../../assets/img/home-jumbo.png'
import { Container } from 'react-bootstrap'
import hassleFreeImg from '../../assets/img/hassle-free.png'
import JuanifyIcon from '../../assets/img/icons/juanify.png'
import aboutUsImg from '../../assets/img/food-delivery.png'
import Efren from '../../assets/img/efren.PNG'
import Joel from '../../assets/img/joel.PNG'
import Rox from '../../assets/img/roxanne.PNG'
import Senibe from '../../assets/img/senibe.PNG'

const people = [
  {
    name: 'Mr. Efren Salvador',
    role: 'CEO',
    imageUrl: Efren,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Ms. Senibe Salve Dioso',
    role: 'CMO',
    imageUrl: Senibe,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Ms. Roxanne Pagaduan',
    role: 'CTO',
    imageUrl: Rox,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Mr. Joel Bautista',
    role: 'CFO',
    imageUrl: Joel,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
]

const HomeScreen = () => {
  const dispatch = useDispatch()

  const restaurantTopRated = useSelector((state) => state.restaurantTopRated)
  const { loading, error, restaurants } = restaurantTopRated

  useEffect(() => {
    dispatch(listTopRestaurants())
  }, [dispatch])

  return (
    <>
      <Meta />
      <div id="home-jumbotron" className="home-jumbotron" style={{backgroundImage: `url(${JuanifyJumbotron})`}}>
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
              <div className="home-restaurants__container">
                {restaurants.map((restaurant) => (
                  <RestaurantCard restaurant={restaurant} key={restaurant._id} />
                ))}
              </div>
            </section>
          </>
        )}
      </Container>
      
      <section id="about-us">
        <div className='bg-blue-500 w-[83%] py-10 px-10 transition duration-200 hover:scale-105 rounded-tr-lg'>
          <div className='flex flex-row justify-between items-center space-x-8'>
              <div>
                <h2 className='text-white'>Juanify history</h2>
                <p className='text-white text-lg'>
                  Juanify started as an idea to aggregate existing app based delivery platform to give the consumer best cost for their logistics.  The sharing of API’s for these platforms is not feasible during the time of inception, we pivoted to aggregate MSME’s with no existing digital footprint.</p>
                <p className='text-white text-lg'>
                  We started to onboard one pilot restaurant in Davao city to test the market.
                </p>
              </div>
              <div>
                <img src={hassleFreeImg} />
              </div>
          </div>
        </div>

        <div className='bg-red-500 w-[83%] ml-auto py-10 px-10 transition duration-200 hover:scale-105'>
          <div className='flex flex-row justify-between items-center space-x-8'>
              <div>
                <img src={JuanifyIcon} className="w-[245px]"/>
              </div>
              <div>
                <h2 className='text-white'>Mission</h2>
                <p className='text-white text-lg'>
                  To unify existing MSME ‘s in one tech platform in the delivery of products and services using AI, Voice Recognition and Image Recognition technology to defined consumers.
                </p>
              </div>
          </div>
        </div>

        <div className='bg-yellow-300 w-[83%] py-10 px-10 transition duration-200 hover:scale-105 rounded-br-lg'>
          <div className='flex flex-row justify-between items-center space-x-8'>
              <div>
                <img src={aboutUsImg} className="w-[500px]" />
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
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our Team</h2>

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
                      <div className="sm:col-span-2">
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