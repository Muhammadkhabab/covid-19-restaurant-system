import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import configureStore from 'redux-mock-store';
import Account from '../components/account/Account';

const mockStore = configureStore([]);

const authenticatedStore = mockStore({
  auth: {
    token: localStorage.getItem('token'),
    isAuthenticated: true,
    user: {
      first_name: 'Matt',
      last_name: 'McJoynt',
      username: 'mcjoynt',
      email: 'user@email.com',
      phone_number: '1234567890',
      old_password: '123abc',
      new_password: '1234abc',
      confirmed_newpassword: '1234abc'
    },
    loading: false,
  }
});

test('renders without crashing', () => {
  render(
    <Provider store={authenticatedStore}>
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Account Update')).toBeInTheDocument();
});
