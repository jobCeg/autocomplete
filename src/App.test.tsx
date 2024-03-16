import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('Should render the app properly', () => {
    render(<App />);

    expect(screen.getByTestId('app')).toBeVisible();
  });
});
