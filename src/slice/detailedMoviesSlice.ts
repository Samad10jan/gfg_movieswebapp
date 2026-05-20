import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TitleDetailsType } from "../utils/types";

interface DetailedMovieState {
    movieDetails: TitleDetailsType | null;
    loading: boolean;
    error: string | null;
}

const initialState: DetailedMovieState = {
    movieDetails: null,
    loading: false,
    error: null,
};

const detailedMoviesSlice = createSlice({
    name: "movieDetails",
    initialState,
    reducers: {
        setMovieDetails: (state, action: PayloadAction<TitleDetailsType | null>) => {
            state.movieDetails = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setMovieDetails, setLoading, setError } = detailedMoviesSlice.actions;
export default detailedMoviesSlice.reducer;