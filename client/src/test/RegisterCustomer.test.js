import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import RegisterCustomer from '../components/auth/RegisterCustomer';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RegisterCustomer />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Account Register')).toBeInTheDocument();
});
