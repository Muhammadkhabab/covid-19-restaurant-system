import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/Form.scss';

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
      return <Redirect to='/dashboard' />;
    } else {
      return <Redirect to='/restaurants' />;
    }
  }

  return (
    <div>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
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
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <div className='other-account-action'>
            <p className='text-secondary'>New to Safe Dining?</p>
            <Link to='/register/customer' className='text-info ml-2'>
              Sign up
            </Link>
          </div>
        </Col>
      </Row>
    </div>
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
