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
  totalPages: number;
  searchQuery: string;
}

const initialState: PostsState = {
  items: [],
  page: 1,
  loading: false,
  totalPages: 0,
  searchQuery: '',
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (_, { getState }) => {
    const state = getState() as { posts: PostsState };
    const { page, searchQuery } = state.posts;
    const response = await fetchPosts(page, 10, searchQuery);
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

export const { setPage, setSearchQuery } = postsSlice.actions;
export default postsSlice.reducer;
