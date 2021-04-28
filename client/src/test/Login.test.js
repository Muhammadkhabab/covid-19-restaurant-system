import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import Login from '../components/auth/Login';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Account Login')).toBeInTheDocument();
});
