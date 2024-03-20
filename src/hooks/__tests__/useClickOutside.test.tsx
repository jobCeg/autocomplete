import { fireEvent, renderHook } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useOnClickOutside(', () => {
  it('should call the callback when a clicking outside the element ref', () => {
    const containerRef = { current: document.createElement('div') };
    const handler = vitest.fn();

    renderHook(() => {
      useClickOutside(containerRef, handler);
    });

    expect(handler).toHaveBeenCalledTimes(0);

    fireEvent.click(document);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not call the handler when clicking inside the element', () => {
    const containerRef = { current: document.createElement('div') };
    const handler = vitest.fn();

    renderHook(() => {
      useClickOutside(containerRef, handler);
    });

    fireEvent.click(containerRef.current);

    expect(handler).toHaveBeenCalledTimes(0);
  });
});
