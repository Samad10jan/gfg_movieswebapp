import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MoviesCardType, MovieState } from "../utils/types";

const initialState: MovieState = {
    movies: [],
    paginationValues: {
        nextPageToken: null,
        totalCount: null,
    },
    loading: false,
    error: null,
    filters: {
        type: null,
        genre: null,
        query: "",
    },
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<MoviesCardType[]>) => {
            state.movies = action.payload;
        },
        appendMovies: (state, action: PayloadAction<MoviesCardType[]>) => {
            state.movies = [...state.movies, ...action.payload];
        },
        setPaginationValues: (state, action: PayloadAction<{ nextPageToken: string | null; totalCount: number | null }>) => {
            state.paginationValues.nextPageToken = action.payload.nextPageToken;
            state.paginationValues.totalCount = action.payload.totalCount;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setTypeFilter: (state, action: PayloadAction<string | null>) => {
            state.filters.type = action.payload;
        },
        setGenreFilter: (state, action: PayloadAction<string | null>) => {
            state.filters.genre = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.query = action.payload;
        },
        clearFilters: (state) => {
            state.filters.type = null;
            state.filters.genre = null;
            state.filters.query = "";
        },
    },
});

export const {
    setMovies,
    appendMovies,
    setPaginationValues,
    setLoading,
    setError,
    setTypeFilter,
    setGenreFilter,
    setSearchQuery,
    clearFilters,
} = movieSlice.actions;
export default movieSlice.reducer;