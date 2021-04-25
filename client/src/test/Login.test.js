import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Login from '../components/auth/Login.js';

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
      }
    });
  });

  it('should be redered without crashing', () => {
    render(
      <Provider store={store}>
        <Login/>
      </Provider>, { wrapper: MemoryRouter }
    );
    expect(screen.getByText('Account Login')).toBeInTheDocument();
  });

});
