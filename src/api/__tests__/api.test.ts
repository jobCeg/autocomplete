import { api } from '../index';
import { API_URL } from '../../config';
import { USERS_RESPONSE } from '../../__mocks__/users';

describe('api handler', () => {
  it('should return an expected response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((resolve) => resolve(USERS_RESPONSE)),
      ok: true,
    });
    const response = await api(API_URL);
    expect(fetch).toHaveBeenCalledWith(API_URL, undefined);
    expect(response).toEqual(USERS_RESPONSE);
  });

  it('should throw an error for a bad response', async () => {
    const statusText = 'Something bad happen';
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((resolve) => resolve([])),
      ok: false,
      statusText,
    });
    try {
      await api(API_URL);
    } catch (error) {
      expect(error).toEqual(new Error(statusText));
    }
  });
});
