import axios, { AxiosError } from "axios";
import {
    setMovies,
    appendMovies,
    setError as setMoviesError,
    setLoading as setMoviesLoading,
    setPaginationValues,
    setSearchQuery,
} from "../slice/movieSlice";
import type { MoviesResponseType } from "../utils/types";
import { setMovieDetails, setLoading, setError } from "../slice/detailedMoviesSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.imdbapi.dev";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const getMovies = (pageToken?: string) => async (dispatch: any) => {
    dispatch(setMoviesLoading(true));
    try {
        const endpoint = pageToken ? `/titles?pageToken=${pageToken}` : "/titles";
        const response = await api.get<MoviesResponseType>(endpoint);

        dispatch(setPaginationValues({
            nextPageToken: response.data.nextPageToken,
            totalCount: response.data.totalCount,
        }));

        if (pageToken) {
            dispatch(appendMovies(response.data.titles));
        } else {
            dispatch(setMovies(response.data.titles));
        }
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
    dispatch(setSearchQuery(query));
    if (!query.trim()) {
        return dispatch(getMovies() as any);
    }

    dispatch(setMoviesLoading(true));
    try {
        const response = await api.get<MoviesResponseType>(
            `/search/titles?query=${encodeURIComponent(query)}`
        );
        dispatch(setMovies(response.data.titles));
        dispatch(setPaginationValues({
            nextPageToken: response.data.nextPageToken,
            totalCount: response.data.totalCount,
        }));
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
    try {
        const response = await api.get(`/titles/${id}`);
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
};

export const getMovieCredits = async (id: string) => {
    try {
        const response = await api.get(`/titles/${id}/credits`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie credits:", error);
        return null;
    }
};