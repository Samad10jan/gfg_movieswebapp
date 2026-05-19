import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieDetails: [],
    loading: false,
    error: null,
};

const detailedMoviesSlice = createSlice({
    name: "movieDetails",
    initialState,
    reducers: {
        setMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setMovieDetails, setLoading, setError } = detailedMoviesSlice.actions;
export default detailedMoviesSlice.reducer;