import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

interface MoviesResponse {
    results: Movie[];
    total_pages: number;
    total_results: number;
    page: number;
}

interface MovieDetailsResponse {
    id: number;
    title: string;
    poster_path?: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genres: {
        name: string
    }[]
}

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`);
            headers.set('Content-Type', 'application/json;charset=utf-8');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMovies: builder.query<MoviesResponse, { page: number; query: string }>({
            query: ({ page, query }) =>
                query ? `search/movie?query=${query}&page=${page}` : `movie/popular?page=${page}`,
        }),
        getMovieDetails: builder.query<MovieDetailsResponse, number>({
            query: (id) => `movie/${id}`,
        }),
    }),
});

export const { useGetMoviesQuery, useGetMovieDetailsQuery } = moviesApi;
