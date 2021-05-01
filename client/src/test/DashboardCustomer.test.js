import { render, screen } from '@testing-library/react';
import DashboardCustomer from '../components/dashboard/DashboardCustomer';

test('renders without crashing', () => {
  render(<DashboardCustomer />);
});
