import { User } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

interface FetchApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

async function fetchApi<T>(endpoint: string, options: FetchApiOptions = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const fetchUsers = async (): Promise<User[]> => {
  return fetchApi<User[]>('/users');
};

export const fetchUserDetail = async (id: string | undefined): Promise<User> => {
  if (!id) throw new Error('User ID is required');
  return fetchApi<User>(`/users/${id}`);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  return fetchApi<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  return fetchApi<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  await fetchApi(`/users/${id}`, {
    method: 'DELETE',
  });
};