import { render, screen } from '@testing-library/react';
import Spinner from '../components/layout/Spinner';

test('renders without crashing', () => {
    render(<Spinner />);
  });

