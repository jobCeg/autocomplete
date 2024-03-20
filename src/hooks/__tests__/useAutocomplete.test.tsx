import { renderHook, waitFor } from '@testing-library/react';
import { useAutocomplete } from '../useAutocomplete';
import { AUTOCOMPLETE_OPTIONS, JANE_DOE } from '../../__mocks__/autocomplete';

describe('useAutocomplete', () => {
  it('should filter suggestions based on input text', async () => {
    const { result, rerender } = renderHook(
      ({ inputText, options }) => useAutocomplete({ inputText, options }),
      {
        initialProps: { inputText: '', options: AUTOCOMPLETE_OPTIONS },
      }
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.suggestions).toEqual(AUTOCOMPLETE_OPTIONS);

    rerender({ inputText: 'jane', options: AUTOCOMPLETE_OPTIONS });

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.suggestions).toEqual([JANE_DOE]);

    rerender({ inputText: 'zxcvb', options: AUTOCOMPLETE_OPTIONS });

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.suggestions).toEqual([]);
  });
});
