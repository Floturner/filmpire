import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreIdOrCategoryId: 'popular',
  page: 1,
  searchQuery: '',
};

export const genreOrCategorySlice = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryId = action.payload;
      state.searchQuery = '';
      state.page = 1;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } =
  genreOrCategorySlice.actions;

export default genreOrCategorySlice.reducer;
