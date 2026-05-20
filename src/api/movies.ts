import axios, { AxiosError } from "axios";
import { setMovies, setError as setMoviesError, setLoading as setMoviesLoading, setPaginationValues } from "../slice/movieSlice";
import type { MoviesResponseType } from "../lib/types";
import { setMovieDetails, setLoading, setError } from "../slice/detailedMoviesSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.imdbapi.dev";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const getMovies = (pageToken?: string) => async (dispatch: any) => {
    dispatch(setMoviesLoading(true));
    try {
        const response = await api.get<MoviesResponseType>(
            `/titles?pageToken=${pageToken || ""}`
        );
        // console.log(response.data);

        dispatch(setPaginationValues({
            nextPageToken: response.data.nextPageToken,
            totalCount: response.data.totalCount,
        }));

        // if (pageToken) {
        //     // Append new movies to existing list
        //     dispatch(setMovies((prevMovies: any) => [...prevMovies, ...response.data.titles]));
        // } else {
        dispatch(setMovies(response.data.titles));
        // }
        dispatch(setMoviesError(null));
    } catch (error) {
        const errorMessage = error instanceof AxiosError
            ? error.message
            : "Failed to fetch movies";
        dispatch(setMoviesError(errorMessage));
        console.error("Error fetching movies:", error);
    } finally {
        dispatch(setMoviesLoading(false));
    }
};

export const searchMovies = (query: string) => async (dispatch: any) => {
    if (!query.trim()) {
        dispatch(setMovies([]));
        return;
    }

    dispatch(setMoviesLoading(true));
    try {
        const response = await api.get<MoviesResponseType>(
            `/search/titles?query=${encodeURIComponent(query)}`
        );
        dispatch(setMovies(response.data.titles));
        dispatch(setMoviesError(null));
    } catch (error) {
        const errorMessage = error instanceof AxiosError
            ? error.message
            : "Failed to search movies";
        dispatch(setMoviesError(errorMessage));
        console.error("Error searching movies:", error);
    } finally {
        dispatch(setMoviesLoading(false));
    }
};

export const getMovieDetails = (id: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    console.log("1");

    try {
        console.log("aa");

        const response = await api.get(`/titles/${id}`);
        console.log(response.data);

        dispatch(setMovieDetails(response.data));
        dispatch(setError(null));
    } catch (error) {
        const errorMessage = error instanceof AxiosError
            ? error.message
            : "Failed to fetch movie details";
        dispatch(setError(errorMessage));
        console.error("Error fetching movie details:", error);
    } finally {
        dispatch(setLoading(false));
    }

}