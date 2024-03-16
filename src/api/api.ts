export const api = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options)
    .then((response) => {
      // If required we can extend here to handle different status codes
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error: Error) => {
      // Handle the error with a logger service like data dog or sentry
      throw error;
    });
};
