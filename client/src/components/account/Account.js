import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { toast } from 'react-toastify';
import { updateUser } from '../../actions/auth';

const Account = ({ auth: { loading, user } }) => {
  // Set user data.
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    oldPassword: '',
    newPassword: '',
    confirmedNewPassword: '',
  });

  useEffect(() => {
    setData(user);
  }, [loading, user]);

  // Destructuring.
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    oldPassword,
    newPassword,
    confirmedNewPassword,
  } = data;

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6 || !/\d/.test(newPassword)) {
      toast.error(
        'Password must be at least 6 characters and contain at least a number!'
      );
    } else if (newPassword !== confirmedNewPassword) {
      toast.error('Passwords do not match!');
    } else {
      updateUser({
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        oldPassword,
        newPassword,
        confirmedNewPassword,
      });
    }
  };

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Form onSubmit={onSubmit} className='authenticate-form'>
        <h3 className='text-center text-info mb-4'>Account Update</h3>
        <FormGroup>
          <Input
            type='text'
            name='name'
            value={firstName}
            placeholder='Please enter your first name'
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            name='lastName'
            value={lastName}
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
            name='phoneNumber'
            value={phoneNumber}
            placeholder='Please enter your phone number'
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            name='oldPassword'
            value={oldPassword}
            placeholder='Please enter your existing password'
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            name='newPassword'
            value={newPassword}
            placeholder='Please enter a new password'
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            name='confirmedNewPassword'
            value={confirmedNewPassword}
            placeholder='Please confirm your new password'
            onChange={onChange}
            required
          />
        </FormGroup>
        <Input
          type='submit'
          value='Update'
          className='btn-outline-info btn-block submitFormButton'
        />
      </Form>
    </div>
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
