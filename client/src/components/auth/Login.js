import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input, Container } from 'reactstrap';
import '../../styles/Form.scss';
import {
  ROUTE_REGISTER_CUSTOMER,
  ROUTE_DASHBOARD_RESTAURANT,
  ROUTE_RESTAURANTS,
} from '../../constants/routes';

const Login = ({ auth: { isAuthenticated, user, loading }, login }) => {
  const [input, setInput] = useState({
    credential: '',
    password: '',
  });

  const { credential, password } = input;

  const onChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login(input);
  };

  if (isAuthenticated && !loading) {
    // Check if user is resaurant or customer
    if (user != null && (user.is_admin || user.is_staff)) {
      return <Redirect to={ROUTE_DASHBOARD_RESTAURANT} />;
    } else {
      return <Redirect to={ROUTE_RESTAURANTS} />;
    }
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
          xs={{ size: 12 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <div className='other-account-action'>
            <p className='text-secondary'>New to Safe Dining?</p>
            <Link to={ROUTE_REGISTER_CUSTOMER} className='text-info ml-2'>
              Sign up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
