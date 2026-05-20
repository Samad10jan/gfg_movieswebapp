import { createSlice } from "@reduxjs/toolkit";
import type { MoviesCardType } from "../lib/types";

interface MovieState {
    movies: MoviesCardType[];
    paginationValues: {
        nextPageToken: string | null,
        totalCount: number | null,
    },
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    paginationValues: {
        nextPageToken: null,
        totalCount: null,
    },
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setPaginationValues: (state, action) => {
            state.paginationValues.nextPageToken = action.payload.nextPageToken;
            state.paginationValues.totalCount = action.payload.totalCount;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        
    },
});

export const { setMovies, setPaginationValues, setLoading, setError} = movieSlice.actions;
export default movieSlice.reducer;