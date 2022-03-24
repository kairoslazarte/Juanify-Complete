import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

// CLIENT
import LocationScreen from './screens/client/LocationScreen'
import HomeScreen from './screens/client/HomeScreen'
import ProductScreen from './screens/client/ProductScreen'
import CartScreen from './screens/client/CartScreen'
import LoginScreen from './screens/client/LoginScreen'
import RegisterScreen from './screens/client/RegisterScreen'
import ProfileScreen from './screens/client/ProfileScreen'
import ShippingScreen from './screens/client/ShippingScreen'
import PaymentScreen from './screens/client/PaymentScreen'
import PlaceOrderScreen from './screens/client/PlaceOrderScreen'
import OrderScreen from './screens/client/OrderScreen'
import OrderListScreen from './screens/client/OrderListScreen'
import FoodDeliveryScreen from './screens/client/FoodDeliveryScreen'
import PartnerScreen from './screens/client/PartnerScreen'
import AboutScreen from './screens/client/AboutScreen'

// ADMIN
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ForgotPassword from './screens/client/ForgotPassword'

const App = () => {
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
                  <Route path='/shipping' component={ShippingScreen} />
                  <Route path='/payment' component={PaymentScreen} />
                  <Route path='/placeorder' component={PlaceOrderScreen} />
                  <Route path='/login' component={LoginScreen} />
                  <Route path='/register' component={RegisterScreen} />
                  <Route path='/partner' component={PartnerScreen} />
                  <Route path='/about-us' component={AboutScreen} />
                  <Route path='/profile' component={ProfileScreen} />
                  <Route path='/product/:id' component={ProductScreen} />
                  <Route path='/product-screen' component={ProductScreen} />
                  <Route path='/food' component={FoodDeliveryScreen} />
                  <Route path='/cart/:id?' component={CartScreen} />
                  <Route path='/admin/userlist' component={UserListScreen} />
                  <Route path='/admin/user/:id/edit' component={UserEditScreen} />
                  <Route path='/forgot-password' component={ForgotPassword} />
                  <Route
                    path='/admin/productlist'
                    component={ProductListScreen}
                    exact
                  />
                  <Route
                    path='/admin/productlist/:pageNumber'
                    component={ProductListScreen}
                    exact
                  />
                  <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
                  <Route path='/admin/orderlist' component={OrderListScreen} />
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