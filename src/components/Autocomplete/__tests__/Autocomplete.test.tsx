import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { Autocomplete } from '../Autocomplete';
import { AUTOCOMPLETE_OPTIONS, JANE_DOE, JOHN_WICK } from '../../../__mocks__/autocomplete';

describe('<Autocomplete />', () => {
  it('should render properly', () => {
    render(<Autocomplete label="Users" options={AUTOCOMPLETE_OPTIONS} />);
    expect(screen.getByTestId('autocomplete')).toBeVisible();
    expect(screen.getByText('Users')).toBeVisible();
  });

  it('should open the dropdown on input click', async () => {
    const user = userEvent.setup();
    render(<Autocomplete label="Users" options={AUTOCOMPLETE_OPTIONS} />);
    expect(screen.getByTestId('autocomplete')).toBeVisible();
    const input = screen.getByRole('combobox');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    user.click(input);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeVisible();
    });
  });

  it('should call onSelect callback with the given selected option', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();

    render(<Autocomplete label="Users" onSelect={mockOnSelect} options={AUTOCOMPLETE_OPTIONS} />);
    expect(screen.getByTestId('autocomplete')).toBeVisible();
    const input = screen.getByRole('combobox');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    user.click(input);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeVisible();
    });

    const options = screen.getAllByRole('option');

    user.click(options[0]);

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(JANE_DOE);
    });
  });

  it('should filter options for given input', async () => {
    const user = userEvent.setup();

    render(<Autocomplete label="Users" options={AUTOCOMPLETE_OPTIONS} />);
    expect(screen.getByTestId('autocomplete')).toBeVisible();
    const input = screen.getByRole('combobox');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    user.click(input);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeVisible();
    });

    user.type(input, 'Wick');

    await waitFor(() => {
      expect(screen.getByText('Searching...')).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByText('Searching...')).toBeVisible();
    });

    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBe(1);
    });

    expect(screen.getByRole('option')).toHaveTextContent(JOHN_WICK.label);
  });
});
