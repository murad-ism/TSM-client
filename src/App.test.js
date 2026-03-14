import { render, screen } from '@testing-library/react';
import App from './App';

test('renders trading systems monitor', () => {
  render(<App />);
  const linkElement = screen.getByText(/trading systems monitor/i);
  expect(linkElement).toBeInTheDocument();
});
