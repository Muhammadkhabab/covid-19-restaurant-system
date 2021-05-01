import { render, screen } from '@testing-library/react';
import Landing from '../components/pages/Landing';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const isAuthenticatedStore = mockStore({
isAuthenticated:true,
});

test('renders without crashing', () => {
    render(<Provider store={isAuthenticatedStore}><Landing /></Provider>,{wrapper: MemoryRouter});
  });

