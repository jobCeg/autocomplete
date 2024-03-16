import { renderHook, act, waitFor } from '@testing-library/react';
import { useLazyQuery } from '../useLazyQuery';
import { getUsers } from '../../features/users/api/getUsers';
import { USERS_RESPONSE } from '../../__mocks__/users';

describe('useLazyQuery', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() =>
      useLazyQuery({
        queryFn: vi.fn(),
      })
    );

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.fetch).toBeDefined();
    expect(result.current.loading).toBeFalsy();
  });

  it('should fetch remote data successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((resolve) => resolve(USERS_RESPONSE)),
      ok: true,
    });

    const { result } = renderHook(() =>
      useLazyQuery({
        queryFn: getUsers,
      })
    );

    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.data).toBe(USERS_RESPONSE);
  });

  it('should abort fetch unresolved', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((resolve) => resolve(USERS_RESPONSE)),
      ok: true,
    });

    const { result } = renderHook(() =>
      useLazyQuery({
        queryFn: getUsers,
      })
    );

    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBe(null);

    act(() => {
      result.current.abort();
    });

    await waitFor(() => {
      expect(result.current.data).toBe(null);
    });
  });

  it('should fail fetching remote data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((_, reject) => reject()),
      ok: false,
    });

    const { result } = renderHook(() =>
      useLazyQuery({
        queryFn: getUsers,
      })
    );

    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error());
  });
});
