import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Routes from '../components/routing/Routes';

const mockStore = configureStore([]);

const routeStore = mockStore({
auth:{
    isAuthenticated: true,
    loading: false,
    user: null,
}
});

test('renders without crashing', () => {
    render(<Provider store={routeStore}><Routes></Routes></Provider>,{wrapper: MemoryRouter});
  });
