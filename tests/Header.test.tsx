import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/ReactJS Blog !/i);
  expect(linkElement).toBeInTheDocument();
});
