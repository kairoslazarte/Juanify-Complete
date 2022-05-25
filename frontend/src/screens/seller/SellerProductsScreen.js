import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {  getRestaurantProfile } from '../../actions/userActions'
import {  deleteProduct, createProduct } from '../../actions/restaurantActions'


const SellerProductsScreen = ({ history, match }) => {
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

    console.log(products)


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
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
        <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
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
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(product._id)}
                            >
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
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
