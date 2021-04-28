import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import RegisterRestaurant from '../components/auth/RegisterRestaurant';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RegisterRestaurant />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Register Your Restaurant!')).toBeInTheDocument();
});
