import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Login from '../components/auth/Login.js';

const mockStore = configureStore([]);

const notAuthenticatedStore = mockStore({
  auth: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
  }
});

const authenticatedStore = mockStore({
  auth: {
    token: localStorage.getItem('token'),
    isAuthenticated: true,
    user: null,
    loading: false,
  },
});

describe('Login Component', () => {
  it('should be redered without crashing', () => {
    render(
      <Provider store={notAuthenticatedStore}>
        <Login/>
      </Provider>, { wrapper: MemoryRouter }
    );
    expect(screen.getByText('Account Login')).toBeInTheDocument();
  });

  it('should redirect if the user is logged in', () => {
    const { 
      container, 
    } = render(
      <Provider store={authenticatedStore}>
        <Login/>
      </Provider>, { wrapper: MemoryRouter }
    );
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

});
