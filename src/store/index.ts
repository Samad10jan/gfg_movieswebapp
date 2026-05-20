import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slice/movieSlice";
import movieDetailsReducer from "../slice/detailedMoviesSlice";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        movieDetails: movieDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;