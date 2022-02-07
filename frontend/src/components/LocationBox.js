import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LocationBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
  }

  return (
    <>
    <div className="location-box">
        <div className="location-box__container">
            <h1>Are you ready?<br/>Enter your location below!</h1>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder='Where are you located?'/>
                <Button type='submit' variant='warning' className='p-2 px-3'>
                    Let's Go!
                </Button>
            </form>
        </div>
    </div>
    </>
  )
}

export default LocationBox
