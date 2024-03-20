import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

const mockDelay = 750;

describe('useDebounce', () => {
  vitest.useFakeTimers();

  it('should debounce the given value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { delay: mockDelay, value: 'foo' },
    });

    expect(result.current).toBe('foo');

    rerender({ delay: mockDelay, value: 'bar' });
    expect(result.current).toBe('foo');

    act(() => {
      vitest.advanceTimersByTime(750);
    });

    expect(result.current).toBe('bar');
  });
});
