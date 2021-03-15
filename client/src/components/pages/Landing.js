import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../styles/Landing.scss'

const Landing = ( { isAuthenticated} ) => {
  
  if (isAuthenticated) {
    return <Redirect to='/menu/' />;
  }

  return (
    <div id='landing-page'>
      <div className='overlay'>
        <div className='content'>
          <h1>Madison Covid-19 Restaurant System</h1>
          <p>
            <i>
              Find up to date information about Covid-19 protocols and procedures at participating restaurants in Madison, Wisconsin.
            </i>
          </p>
          <div>
            <Link to='/dashboard' className='btn btn-outline-light mr-2' id='restaurant-info'>
              View Restaurant Information
            </Link>
          </div>
          <div>
            <Link to='/register/restaurant' className='btn btn-outline-info mr-2'>
              Register Restaurant
            </Link>
            <Link to='/register/customer' className='btn btn-outline-info ml-2'>
              Register Customer
            </Link>
          </div>
          <div>
            <Link to='/login' className='btn btn-outline-light mr-2'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
