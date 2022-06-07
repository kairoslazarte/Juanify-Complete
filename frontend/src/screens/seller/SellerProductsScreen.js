import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {  getRestaurantProfile } from '../../actions/userActions'
import {  deleteProduct, createProduct } from '../../actions/restaurantActions'


const SellerProductsScreen = ({ history, match }) => {
  const [filterProducts, setFilterProducts] = useState('All')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantProfile = useSelector((state) => state.restaurantProfile)
  const { loading, error, restaurant } = restaurantProfile

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
      if (!userInfo) {
          history.push('/login')
      } else {
          if (!restaurant || !restaurant.name) {
              dispatch(getRestaurantProfile('restaurant/profile'))
          } 
      }
  }, [dispatch, history, userInfo, restaurant])

  const { products } = restaurant

  const categories = []

  products && (
    products.map((product) => {
      if (product.category == product.category) {
          categories.push(product.category)
      }
    })
  )

  const product_category = []
      
  for(let i of categories) {
      if(product_category.indexOf(i) === -1) {
          product_category.push(i)
      }
  }


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
      window.location.reload();
    }
  }

  const createProductHandler = () => {
    history.push(`/partner/create-product`)
  }

  return (
    <div className='container pt-10'>
      <Row className='flex flex-col sm:flex-row items-center justify-between w-full'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='sm:text-right'>
        <button className='my-3 bg-blue-700 font-medium transition duration-200 text-white py-3 px-4 hover:opacity-60' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {/*{loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
         <div className='restaurant-categories'>

            <div className='restaurant-categories__container'>
                <button className={filterProducts == 'All' ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilterProducts('All')}>All</button>
                {product_category.map((prod_cat) => (
                    <button className={filterProducts == prod_cat ? 'restaurant-category__active' : 'restaurant-category'} onClick={() => setFilterProducts(prod_cat)}>{prod_cat}</button>
                ))}
            </div>
          </div>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>STOCK/S</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products && (
                    products.map((product) => (
                      <>
                      {filterProducts == 'All' 
                      ? 
                      <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>{product.price}</td>
                          <td>{product.countInStock}</td>
                          <td className='flex items-center space-x-2'>
                              <LinkContainer to={`/partner/product/${product._id}/edit`}>
                                  <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                                  </Button>
                              </LinkContainer>
                              <button
                                  className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                                  onClick={() => deleteHandler(product._id)}
                              >
                                  <i className='fas fa-trash'></i>
                              </button>
                          </td>
                      </tr>
                      :
                      product.category == filterProducts && (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                            <td className='flex items-center space-x-2'>
                                <LinkContainer to={`/partner/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <button
                                    className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                                    onClick={() => deleteHandler(product._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                      )
                      }
                      </>
                    ))
                )}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default SellerProductsScreen
