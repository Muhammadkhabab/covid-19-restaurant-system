import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NotFound.scss';

const NotFound = () => {
  return (
    <div id='notFoundPages' className='text-center'>
      <h1 className='display-1'>404</h1>
      <p>Oops! The page you are looking for does not exist...</p>
      <Link className='btn btn-primary' to='/'>
        <i className='fas fa-home'></i> Let's go back to home page!
      </Link>
    </div>
  );
};

export default NotFound;
