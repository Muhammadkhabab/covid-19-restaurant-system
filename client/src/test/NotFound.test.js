import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../components/pages/NotFound';

test('renders without crashing', () => {
    render(<Router><NotFound /></Router>);
  });

