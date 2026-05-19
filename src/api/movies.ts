import axios, { AxiosError } from "axios";
import { setMovies, setError, setLoading, setPaginationValues } from "../slice/movieSlice";
import type { MoviesResponseType } from "../lib/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.imdbapi.dev";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const getMovies = (pageToken?: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get<MoviesResponseType>(
            `/titles?pageToken=${pageToken || ""}`
        );
        console.log(response.data);

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
        dispatch(setError(null));
    } catch (error) {
        const errorMessage = error instanceof AxiosError
            ? error.message
            : "Failed to fetch movies";
        dispatch(setError(errorMessage));
        console.error("Error fetching movies:", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const searchMovies = (query: string) => async (dispatch: any) => {
    if (!query.trim()) {
        dispatch(setMovies([]));
        return;
    }

    dispatch(setLoading(true));
    try {
        const response = await api.get<MoviesResponseType>(
            `/search/titles?query=${encodeURIComponent(query)}`
        );
        dispatch(setMovies(response.data.titles));
        dispatch(setError(null));
    } catch (error) {
        const errorMessage = error instanceof AxiosError
            ? error.message
            : "Failed to search movies";
        dispatch(setError(errorMessage));
        console.error("Error searching movies:", error);
    } finally {
        dispatch(setLoading(false));
    }
};