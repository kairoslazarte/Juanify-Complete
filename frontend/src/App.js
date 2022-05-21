import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import alanBtn from "@alan-ai/alan-sdk-web"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { logout } from './actions/userActions'

// CLIENT
import LocationScreen from './screens/client/LocationScreen'
import HomeScreen from './screens/client/HomeScreen'
import ProductScreen from './screens/client/ProductScreen'
import RestaurantScreen from './screens/client/RestaurantScreen'
import CartScreen from './screens/client/CartScreen'
import LoginScreen from './screens/client/LoginScreen'
import RegisterScreen from './screens/client/RegisterScreen'
import ProfileScreen from './screens/client/ProfileScreen'
import ShippingScreen from './screens/client/ShippingScreen'
import PaymentScreen from './screens/client/PaymentScreen'
import PlaceOrderScreen from './screens/client/PlaceOrderScreen'
import OrderScreen from './screens/client/OrderScreen'
import FoodDeliveryScreen from './screens/client/FoodDeliveryScreen'
import PartnerScreen from './screens/client/PartnerScreen'
import AboutScreen from './screens/client/AboutScreen'

// SELLER
import SellerProfileScreen from './screens/seller/SellerProfileScreen'
import SellerProductsScreen from './screens/seller/SellerProductsScreen'
import SellerProductEditScreen from './screens/seller/SellerProductEditScreen'
import SellerCreateProductScreen from './screens/seller/SellerCreateProductScreen'
import SellerOrderlistScreen from './screens/seller/SellerOrderlistScreen'
import SellerOrderDetailsScreen from './screens/seller/SellerOrderDetailsScreen'

// ADMIN
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ForgotPassword from './screens/client/ForgotPassword'
import OrderListScreen from './screens/client/OrderListScreen'

var today = new Date()
var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

console.log(currTime)

const COMMANDS = {
  DATE: 'date',
  TIME: 'time'
}

const App = () => {
  const [alanInstance, setAlanInstance] = useState()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  const date_today = useCallback(() => {
    alanInstance.playText(`The date today is ${currDate}`)
  }, [alanInstance])
  
  const curr_time = useCallback(() => {
    alanInstance.playText(`The time is ${currTime}`)
  }, [alanInstance])

  useEffect(() => {
    window.addEventListener(COMMANDS.DATE, date_today)
    window.addEventListener(COMMANDS.TIME, curr_time)

    return () => {
      window.removeEventListener(COMMANDS.DATE, date_today)
      window.removeEventListener(COMMANDS.TIME, curr_time)
    }
  }, [date_today, curr_time])

  useEffect(() => {
    if (alanInstance != null) return

    setAlanInstance(
      alanBtn({
        key: '316a441b5efc8e273c1ba1616d61a3c22e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          window.dispatchEvent(new CustomEvent(commandData.command))
          if (commandData.command === "navigation") {
            if (commandData.route == "home") {
              window.location = "/"
            }
            else if (commandData.route == "cart") {
              window.location = "/cart"
            }
            else if (commandData.route == "browse") {
              window.location = "/food"
            }
          }
          else if (commandData.command === "order") {
            window.location = `/search/${commandData.data}`
          }
          else if (commandData.command === "logout") {
            logoutHandler()
          }
        }
      })
    )
  })

  return (
    <>
      {sessionStorage.getItem('user_location') === null
        ?
        <>
         <main className='main-layout'>
            <LocationScreen />
         </main>
        </>
        :
        <>
          <Router>
            <Header />
              <main className='main-layout'>
                <Container>
                  <Route path='/input-location' component={LocationScreen} />
                  <Route path='/order/:id' component={OrderScreen} />
                  <Route path='/partner/order/:id' component={SellerOrderDetailsScreen} />
                  <Route path='/shipping' component={ShippingScreen} />
                  <Route path='/payment' component={PaymentScreen} />
                  <Route path='/placeorder' component={PlaceOrderScreen} />
                  <Route path='/login' component={LoginScreen} />
                  <Route path='/register' component={RegisterScreen} />
                  <Route path='/partner-with-us' component={PartnerScreen} />
                  <Route path='/about-us' component={AboutScreen} />
                  <Route path='/profile' component={ProfileScreen} />
                  <Route path='/restaurant/:id' component={RestaurantScreen} />
                  <Route path='/product-screen' component={ProductScreen} />
                  <Route path='/food' component={FoodDeliveryScreen} />
                  <Route path='/cart/:id?' component={CartScreen} />
                  <Route path='/admin/userlist' component={UserListScreen} />
                  <Route path='/admin/user/:id/edit' component={UserEditScreen} />
                  <Route path='/forgot-password' component={ForgotPassword} />
                  <Route path='/partner/profile' component={SellerProfileScreen} />
                  <Route path='/partner/products' component={SellerProductsScreen} />
                  <Route path='/partner/create-product' component={SellerCreateProductScreen} />
                  <Route path='/partner/product/:id/edit' component={SellerProductEditScreen} />
                  <Route path='/partner/orderlist' component={SellerOrderlistScreen} />
                  <Route path='/search/:keyword' component={HomeScreen} exact />
                  <Route path='/page/:pageNumber' component={HomeScreen} exact />
                  <Route
                    path='/search/:keyword/page/:pageNumber'
                    component={HomeScreen}
                    exact
                  />
                  <Route path='/' component={HomeScreen} exact />
                  <Route path='/home' component={HomeScreen} exact />
                </Container>
              </main>
            <Footer />
          </Router>
        </>
      }
    </>
  )
}

export default App