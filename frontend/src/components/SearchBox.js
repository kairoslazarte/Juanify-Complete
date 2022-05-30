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
    <div className='header__search-box xl:my-0 my-2'>
      <div>
        <Form onSubmit={submitHandler} inline>
          <div className='flex items-center'>
            <Form.Control
              type='text'
              name='q'
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='Search a Restaurant...'
              className='mr-2'
            ></Form.Control>

            <button type='submit' className='py-2 px-3 bg-yellow-500 text-white font-bold border-2 border-yellow-500 text-base hover:opacity-60 transition duration-200 tracking-wide'>
              GO!
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SearchBox
