import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Subscribe from '../components/restaurants/Subscribe.js';

const mockStore = configureStore([]);

const blankStore = mockStore({});

describe('Subscribe Component', () => {
  it('should be redered without crashing', () => {
    render(
      <Provider store={blankStore}>
        <Subscribe/>
      </Provider>, { wrapper: MemoryRouter }
    );
    expect(screen.getByText('Interval (in minutes)')).toBeInTheDocument();
  });
});