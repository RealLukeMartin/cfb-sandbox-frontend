const {
  VITE_API_URL = 'http://localhost:4000',
} = import.meta.env;

export const config = {
  api: {
    url: VITE_API_URL,
  }
};