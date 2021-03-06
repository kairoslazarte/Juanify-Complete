import React, { useEffect , useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'

const UserListScreen = ({ history, match }) => {
  const [filter, setFilter] = useState('All')

  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(keyword))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo, keyword])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div className='container pt-10'>
      <h1 className='pb-2'>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <SearchBox history={history} isAdmin={true} />

        <div className='restaurant-categories pt-3'>
          <div className='restaurant-categories__container'>
            <button 
              type='button' 
              className={filter == 'All' ? 'restaurant-category__active' : 'restaurant-category'}
              onClick={() => setFilter('All')}
            >
              All
            </button>
            <button 
              type='button' 
              className={filter == 'Customer' ? 'restaurant-category__active' : 'restaurant-category'}
              onClick={() => setFilter('Customer')}
            >
              Customer
            </button>
            <button 
              type='button' 
              className={filter == 'Seller' ? 'restaurant-category__active' : 'restaurant-category'}
              onClick={() => setFilter('Seller')}
            >
              Seller
            </button>
            <button 
              type='button' 
              className={filter == 'Admin' ? 'restaurant-category__active' : 'restaurant-category'}
              onClick={() => setFilter('Admin')}
            >
              Admin
            </button>
            <button 
              type='button' 
              className={filter == 'Apply' ? 'restaurant-category__active' : 'restaurant-category'}
              onClick={() => setFilter('Apply')}
            >
              Applying for Partnership
            </button>
          </div>
        </div>
        
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>SELLER</th>
              <th>APPLYING FOR SELLER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              filter == 'All' ? (
                <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.isSeller ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                 <td>
                  {user.applyingForSeller ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='flex items-center space-x-2'>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <button
                    className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
                </tr>
              ) : filter == 'Seller' ? (
                user.isSeller && (
                  <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {user.isSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                   <td>
                    {user.applyingForSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='flex items-center space-x-2'>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <button
                      className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
                )
              ) : filter == 'Customer' ? (
                !user.isSeller && 
                !user.isAdmin &&
                !user.applyingForSeller && (
                  <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {user.isSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                   <td>
                    {user.applyingForSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='flex items-center space-x-2'>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <button
                      className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                  </tr>
                )
              ) : filter == 'Admin' ? (
                user.isAdmin && (
                  <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {user.isSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                   <td>
                    {user.applyingForSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='flex items-center space-x-2'>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <button
                      className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
                )
              ) : (
                user.applyingForSeller && (
                  <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {user.isSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                   <td>
                    {user.applyingForSeller ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='flex items-center space-x-2'>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <button
                      className='bg-red-500 font-medium transition duration-200 py-2 px-3 hover:opacity-60 text-white text-xs'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
                )
              )
            ))}
          </tbody>
        </Table>
        </>
      )}
    </div>
  )
}

export default UserListScreen
