import {
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL,
    RESTAURANT_DELETE_REQUEST,
    RESTAURANT_DELETE_SUCCESS,
    RESTAURANT_DELETE_FAIL,
    RESTAURANT_CREATE_RESET,
    RESTAURANT_CREATE_FAIL,
    RESTAURANT_CREATE_SUCCESS,
    RESTAURANT_CREATE_REQUEST,
    RESTAURANT_UPDATE_REQUEST,
    RESTAURANT_UPDATE_SUCCESS,
    RESTAURANT_UPDATE_FAIL,
    RESTAURANT_UPDATE_RESET,
    RESTAURANT_CREATE_REVIEW_REQUEST,
    RESTAURANT_CREATE_REVIEW_SUCCESS,
    RESTAURANT_CREATE_REVIEW_FAIL,
    RESTAURANT_CREATE_REVIEW_RESET,
    RESTAURANT_TOP_REQUEST,
    RESTAURANT_TOP_SUCCESS,
    RESTAURANT_TOP_FAIL,
  } from '../constants/restaurantConstants'
  
  export const restaurantListReducer = (state = { restaurants: [] }, action) => {
    switch (action.type) {
      case RESTAURANT_LIST_REQUEST:
        return { loading: true, restaurants: [] }
      case RESTAURANT_LIST_SUCCESS:
        return {
          loading: false,
          restaurants: action.payload.restaurants,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case RESTAURANT_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const restaurantDetailsReducer = (
    state = { restaurant: { products: [] } },
    action
  ) => {
    switch (action.type) {
      case RESTAURANT_DETAILS_REQUEST:
        return { ...state, loading: true }
      case RESTAURANT_DETAILS_SUCCESS:
        return { loading: false, restaurant: action.payload }
      case RESTAURANT_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const restaurantTopRatedReducer = (state = { restaurants: [] }, action) => {
    switch (action.type) {
      case RESTAURANT_TOP_REQUEST:
        return { loading: true, restaurants: [] }
      case RESTAURANT_TOP_SUCCESS:
        return { loading: false, restaurants: action.payload }
      case RESTAURANT_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  