import { createSlice} from "@reduxjs/toolkit";
import type { MoviesCardType } from "../lib/types";

interface MovieState {
    movies: MoviesCardType[];
    searchValue: string;
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    searchValue: "",
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
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setMovies, setSearchValue, setLoading, setError } = movieSlice.actions;
export default movieSlice.reducer;