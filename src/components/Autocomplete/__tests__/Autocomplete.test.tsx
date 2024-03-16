import { render, screen } from '@testing-library/react';
import { Autocomplete } from '../Autocomplete';

describe('<Autocomplete />', () => {
  it('should render properly', () => {
    render(<Autocomplete />);
    expect(screen.getByText('Autocomplete')).toBeVisible();
  });
});
