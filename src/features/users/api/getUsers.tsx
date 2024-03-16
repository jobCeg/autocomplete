import { api } from '../../../api';
import { API_URL } from '../../../config';

import { User } from '../types';

export const getUsers = async (options?: RequestInit): Promise<User[]> => {
  return api<User[]>(`${API_URL}/users`, options);
};
export type QueryFnType = typeof getUsers;
export type QueryFnResponseType = ReturnType<QueryFnType>;
