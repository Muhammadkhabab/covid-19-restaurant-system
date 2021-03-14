import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/Form.scss';

const Login = ({ login, isAuthenticated }) => {

  const [user, setUser] = useState({
    credential: '',
    password: ''
  });

  const { credential, password } = user;
  
  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    login(user);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

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
                name='credential'
                value={credential}
                placeholder='Please enter a valid credential'
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);