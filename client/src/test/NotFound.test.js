import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../components/pages/NotFound';

test('renders without crashing', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  expect(screen.getByText('Oops! The page you are looking for does not exist...')).toBeInTheDocument();
});
