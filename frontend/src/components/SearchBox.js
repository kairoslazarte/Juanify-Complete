import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history, isAdmin = false, atProductSeller = false, atOrdersSeller = false }) => {
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
              placeholder={`${isAdmin || atOrdersSeller ? 'Search by First name' : atProductSeller ? 'Search by Product name' : 'Search for a Restaurant'}...`}
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
