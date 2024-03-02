import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchPosts = async (page = 1, limit = 10, searchQuery = '') => {
  const response = await api.get(`/posts`, {
    params: {
      _page: page,
      _limit: limit,
      q: searchQuery,
    },
  });
  return response.data;
};
