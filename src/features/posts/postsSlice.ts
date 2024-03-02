/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../api/api';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (_arg, { getState }) => {
    const state: any = getState();
    const currentPage = state.posts.page;
    const searchQuery = state.posts.searchQuery;
    const response = await fetchPosts(currentPage, 10, searchQuery);
    return response;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    page: 1,
    loading: false,
    totalPages: 0,
    searchQuery: '',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(loadPosts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;
export const { setPage, setSearchQuery } = postsSlice.actions;