import {configureStore} from "@reduxjs/toolkit";
import movieReducer from "../slice/movieSlice";
import movieDetailsReducer from "../slice/detailedMoviesSlice";
export const store = configureStore({
    reducer: {
        movies:movieReducer,
        movieDetails: movieDetailsReducer
    }}
)