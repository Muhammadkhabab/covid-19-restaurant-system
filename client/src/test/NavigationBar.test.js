import { render, screen } from '@testing-library/react';
import NavigationBar from '../components/layout/NavigationBar';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { logout } from '..//actions/auth';


const mockStore = configureStore([]);

const navigationStore = mockStore({
  icon: 'fas fa-utensils',
  title:  'Safe Dining',
  auth:{
    isAuthenticated: true,
    loading: true,
    user: null,
  },
  logout,
});

test('renders without crashing', () => {
    render(<Provider store={navigationStore}><NavigationBar /></Provider>,{wrapper: MemoryRouter});
  });

