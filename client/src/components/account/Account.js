import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { toast } from 'react-toastify';
import { updateUser } from '../../actions/auth';

const Account = ({ auth: { loading, user }, updateUser }) => {
  // Set user data.
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    old_password: '',
    new_password: '',
    confirmed_newpassword: '',
  });

  useEffect(() => {
    if (!loading && user !== null) {
      setData(user);
    }
  }, [loading, user]);

  // Destructuring.
  const {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    old_password,
    new_password,
    confirmed_newpassword,
  } = data;

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();

    if (new_password.length < 6 || !/\d/.test(new_password)) {
      toast.error(
        'Password must be at least 6 characters and contain at least a number!'
      );
    } else if (new_password !== confirmed_newpassword) {
      toast.error('Passwords do not match!');
    } else {
      updateUser({
        first_name,
        last_name,
        username,
        email,
        phone_number,
        old_password,
        new_password,
        confirmed_newpassword,
      });
      setData({
        ...data,
        old_password: '',
        new_password: '',
        confirmed_newpassword: '',
      });
    }
  };

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return loading || user === null ? (
    <Spinner />
  ) : (
    <Container className='my-4'>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <Form onSubmit={onSubmit} className='authenticate-form'>
            <h3 className='text-center text-info mb-4'>Account Update</h3>
            <FormGroup>
              <Input
                type='text'
                name='first_name'
                value={first_name}
                placeholder='Please enter your first name'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='last_name'
                value={last_name}
                placeholder='Please enter your last name'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='username'
                value={username}
                placeholder='Please enter your username'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Please enter your email address'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='phone_number'
                value={phone_number}
                placeholder='Please enter your phone number'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='old_password'
                value={old_password}
                placeholder='Please enter your existing password'
                onChange={onChange}
                autoComplete='new-password'
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='new_password'
                value={new_password}
                placeholder='Please enter a new password'
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='confirmed_newpassword'
                value={confirmed_newpassword}
                placeholder='Please confirm your new password'
                onChange={onChange}
              />
            </FormGroup>
            <Input
              type='submit'
              value='Update'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapFunctionsToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapFunctionsToProps)(Account);
