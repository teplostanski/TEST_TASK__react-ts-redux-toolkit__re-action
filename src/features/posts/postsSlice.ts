import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../api/api';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  page: number;
  loading: boolean;
}

const initialState: PostsState = {
  items: [],
  page: 1,
  loading: false,
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (_, { getState }) => {
    const state = getState() as { posts: PostsState };
    const { page } = state.posts;
    const response = await fetchPosts(page, 10);
    return response;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
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

export const { setPage } = postsSlice.actions;
export default postsSlice.reducer;
