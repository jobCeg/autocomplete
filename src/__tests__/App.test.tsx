import { render, screen } from '@testing-library/react';
import App from '../App';
import { USERS_RESPONSE } from '../__mocks__/users';

describe('<App />', () => {
  beforeAll(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((resolve) => resolve(USERS_RESPONSE)),
      ok: true,
    });
  });
  it('Should render the app properly', () => {
    render(<App />);
    expect(screen.getByTestId('app')).toBeVisible();
    expect(screen.getByTestId('autocomplete')).toBeVisible();
    expect(screen.getByText('Autocomplete')).toBeVisible();
  });
});
