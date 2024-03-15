import { render, screen } from '@testing-library/react';
import App from './App';

describe('Something', () => {
  it('should render properly', () => {
    render(<App />);
    const headline = screen.getByText('Vite + React');
    expect(headline).toBeInTheDocument();
  });
});
