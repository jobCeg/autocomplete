import { getUsers } from '../getUsers';
import { USERS_RESPONSE } from '../../../../__mocks__/users';

describe('getUsers', () => {
  it('should retrieve users', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => new Promise((resolve) => resolve(USERS_RESPONSE)),
      ok: true,
    });

    const users = await getUsers();
    expect(users).toEqual(USERS_RESPONSE);
  });
});
