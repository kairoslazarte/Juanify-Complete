import React, { useState, useEffect } from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'

const PartnerScreen = () => {
    return (
    <div className='partner-screen'>
        <div className='partner-screen-bg'>
      <div className='partner-screen-col-one'>
        <div className='partner-screen-col-one-a'/>
      </div>
      <div className='partner-screen-grid-one'>
        <div className='partner-screen-col-one-b'>
          <div className='partner-screen-col-one-size'>
            <h2>Partner With Us</h2>
            <p className='partner-screen-desc'>
             Fill out the form to be one of our merchants
            </p>
            <dl>
              <div>
                <dt>Postal address</dt>
                <dd>
                  <p>Davao City, Philippines</p>
                </dd>
              </div>
              <div className='partner-screen-phone-num'>
                <dt>Phone number</dt>
                <dd className='partner-screen-icons'>
                  <PhoneIcon className='partner-screen-set-icons' aria-hidden="true"/>
                  <span className='partner-screen-icons-spans'>+63 925 664 8806</span>
                </dd>
              </div>
              <div className='partner-screen-email'>
                <dt>Email</dt>
                <dd className='partner-screen-icons'>
                  <MailIcon className='partner-screen-set-icons' aria-hidden="true"/>
                  <span className='partner-screen-icons-spans'>support@example.com</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className='partner-screen-col-two-bg'>
          <div className='partner-screen-col-two-size'> 
            <form action="#" method="POST">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="name"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  defaultValue={''}
                />
              </div>
              <div>
                <button
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}

export default PartnerScreen