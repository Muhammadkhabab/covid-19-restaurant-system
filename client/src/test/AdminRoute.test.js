import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Component } from 'react';
import AdminRoute from '../components/routing/AdminRoute';


const mockStore = configureStore([]);

const adminStore = mockStore({
component: Component,
auth:{
    isAuthenticated: true,
    loading:true,
    user:null,
}
});

test('renders without crashing', () => {
    render(<Provider store={adminStore}><AdminRoute></AdminRoute></Provider>,{wrapper: MemoryRouter});
  });
