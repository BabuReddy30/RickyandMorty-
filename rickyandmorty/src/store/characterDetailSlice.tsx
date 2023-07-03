import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    characters: [],
    loading: false,
    error: null,
    characterDetails: null,
};

const characterDetailSlice = createSlice({
    name: 'charactersDetails',
    initialState,
    reducers: {
        fetchCharacterById: (state, action) => {
            state.loading = true;
            state.characterDetails = null;
            state.error = null;
        },
        fetchCharacterByIdSuccess: (state, action) => {
            state.characterDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCharacterByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCharacterById,
    fetchCharacterByIdSuccess,
    fetchCharacterByIdFailure,
} = characterDetailSlice.actions;

export default characterDetailSlice.reducer;
