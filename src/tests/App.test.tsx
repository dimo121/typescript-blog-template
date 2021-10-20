import { render, screen } from '@testing-library/react';
import AppRouter from '../router/AppRouter';

test('renders heading with React.JS blog', () => {

  render(<AppRouter />);

  const linkElement = screen.getByRole('heading', { name: /React.JS blog/i});
  expect(linkElement).toBeInTheDocument();
});

