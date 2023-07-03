import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: [],
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharacters: (state) => {
      state.loading = true;
    },
    fetchCharactersSuccess: (state, action) => {
      state.characters = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCharactersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCharacters, fetchCharactersSuccess, fetchCharactersFailure } = characterSlice.actions;

export default characterSlice.reducer;
