/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../api/api';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (_arg, { getState }) => {
    const state: any = getState();
    const currentPage = state.posts.page || 1;
    const response = await fetchPosts(currentPage);
    return response;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    page: 1,
    loading: false,
  },
  reducers: {},
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
