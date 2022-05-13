import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <div className='header__search-box'>
      <div>
        <Form onSubmit={submitHandler} inline>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search a Restaurant...'
            className='mr-sm-2 ml-sm-5'
          ></Form.Control>
        </Form>
      </div>
      
      <Button type='submit' variant='warning' className='p-2 px-3'>
        <i className="fas fa-microphone"></i>
      </Button>
    </div>
  )
}

export default SearchBox
