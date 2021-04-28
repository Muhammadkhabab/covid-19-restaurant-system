import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import Account from '../components/account/Account';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Account Update')).toBeInTheDocument();
});
