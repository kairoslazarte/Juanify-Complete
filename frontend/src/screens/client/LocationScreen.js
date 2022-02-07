import React, { useState, useEffect } from 'react'
import JuanIcon from '../../assets/img/icons/juanify.png'

const LocationScreen = () => {

    function onSubmitHandler(data) {
        data.preventDefault()
        sessionStorage.setItem('user_location', data.target.input_location.value)
        window.location.href = '/'
    }

    return (
        <>
             <div className="location-screen">
                <div className="location-screen__container">
                    <div className="location-screen__banner">
                        <div className="location-screen__banner-bg">
                            <div aria-hidden="true" className="location-screen__banner-style">
                                <svg
                                    className="location-screen__svg-style--1"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 1463 360"
                                >
                                    <path
                                    className="location-screen__svg-style--2"
                                    fill="currentColor"
                                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                                    />
                                    <path
                                    className="location-screen__svg-style--3"
                                    fill="currentColor"
                                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                                    />
                                </svg>
                            </div>
                            
                            <div className="location-screen__input">
                                <div className="location-screen__input--texts">
                                    <h2 className="location-screen__input--texts-title">
                                        Get started by entering your location
                                    </h2>
                                    <div className='location-screen__input--texts-subtitle-container'>
                                        <p className="location-screen__input--texts-subtitle">
                                            We deliver right in front of your door steps!
                                        </p>
                                        <img src={JuanIcon} className='location-screen__input-icon' />
                                    </div>
                                </div>
                                <form onSubmit={onSubmitHandler} className="location-screen__input-form">
                                    <div className="location-screen__input-form--container">
                                        <label htmlFor="input_location" className="sr-only">
                                            Input your location
                                        </label>
                                        <input
                                            id="input_location"
                                            name="input_location"
                                            type="text"
                                            className="location-screen__input-btn"
                                            placeholder="Enter your location"
                                        />
                                    </div>
                                    <div className="location-screen__input-btn--submit-container">
                                        <button
                                            type="submit"
                                            className="location-screen__input-btn--submit"
                                        >
                                            Let's go!
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </>
    )
}

export default LocationScreen