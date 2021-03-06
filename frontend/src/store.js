import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  restaurantListReducer,
  restaurantTopRatedReducer,
  restaurantDetailsReducer,
  restaurantReviewCreateReducer,
  restaurantCreateReducer,
  productDeleteReducer,
  productCreateReducer,
  restaurantRecentlyOrdereddReducer
} from './reducers/restaurantReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  restaurantProfileReducer,
  restaurantUpdateProfileReducer
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  restaurantList: restaurantListReducer,
  restaurantDetails: restaurantDetailsReducer,
  restaurantTopRated: restaurantTopRatedReducer,
  restaurantRecentlyOrdered: restaurantRecentlyOrdereddReducer,
  restaurantReviewCreate: restaurantReviewCreateReducer,
  restaurantCreate: restaurantCreateReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  restaurantProfile: restaurantProfileReducer,
  restaurantUpdateProfile: restaurantUpdateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

var confirmed_acc

if (userInfoFromStorage) {
  userInfoFromStorage.confirmed && (
    confirmed_acc = {
      cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
      },
      userLogin: { userInfo: userInfoFromStorage },
    }
  )
} else {
  confirmed_acc = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
    },
  }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  confirmed_acc,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
