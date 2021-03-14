import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/Form.scss';

const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;
  
  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <div>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <Form 
            onSubmit={onSubmit} 
            className='authenticate-form'>
            <h3 className='text-center text-info mb-4'>Account Login</h3>
            <FormGroup>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Please enter a valid email'
                onChange={onChange}
                autoComplete='new-off'
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='password'
                value={password}
                placeholder='Please enter a secure password'
                onChange={onChange}
                autoComplete='new-password'
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Login'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
        </Col>
      </Row>
    </div>
  );
};

Login.propTypes = {};

export default Login;