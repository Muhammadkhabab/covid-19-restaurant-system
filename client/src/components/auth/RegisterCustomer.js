import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import '../../styles/Form.scss';
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER_RESTAURANT,
  ROUTE_DASHBOARD_USER,
} from '../../constants/routes';

const Register = ({ register, isAuthenticated }) => {
  // Set user data.
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmed_password: '',
    address: '',
    phone_number: '',
  });

  // Destructuring.
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirmed_password,
    phone_number,
  } = user;

  // Event listener for change in input fields.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6 || !/\d/.test(password)) {
      toast.error(
        'Password must be at least 6 characters and contain at least a number!'
      );
    } else if (password !== confirmed_password) {
      toast.error('Passwords do not match!');
    } else {
      register(user);
    }
  };

  // Redirect if registered.
  if (isAuthenticated) {
    return <Redirect to={ROUTE_DASHBOARD_USER} />;
  }

  return (
    <Container className='my-4'>
      <Row>
        <Col
          xs={{ size: 12 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <Form onSubmit={onSubmit} className='authenticate-form'>
            <h3 className='text-center text-info mb-4'>Account Register</h3>
            <FormGroup>
              <Input
                type='text'
                name='first_name'
                value={first_name}
                placeholder='First name'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='last_name'
                value={last_name}
                placeholder='Last name'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='username'
                value={username}
                placeholder='Username'
                onChange={onChange}
                autoComplete='new-password'
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Email'
                onChange={onChange}
                autoComplete='new-password'
                required
              />
            </FormGroup>
            <FormGroup className='with-tooltip'>
              <Input
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={onChange}
                autoComplete='new-password'
                required
              />
              <i
                className='fas fa-info-circle'
                id='password-info-tooltip'
                data-toggle='tooltip'
                data-placement='top'
                data-container='.container'
                data-html='true'
                title='Password must be between 6 and 20 characters and contain at least a digit'
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='confirmed_password'
                value={confirmed_password}
                placeholder='Confirmed password'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='tel'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                name='phone_number'
                value={phone_number}
                placeholder='Phone number (xxx-xxx-xxxx)'
                onChange={onChange}
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Register'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
        <Col
          xs={{ size: 12 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <div className='other-account-action'>
            <p className='text-secondary'>Already have an account?</p>
            <Link to={ROUTE_LOGIN} className='text-info ml-2'>
              Sign in
            </Link>
          </div>
          <div className='other-account-action'>
            <p className='text-secondary'>Own a restaurant?</p>
            <Link to={ROUTE_REGISTER_RESTAURANT} className='text-info ml-2'>
              Register your business
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
