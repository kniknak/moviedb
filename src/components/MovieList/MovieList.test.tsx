import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useGetMoviesQuery} from '../../store/moviesApi';
import MovieList from './MovieList';

jest.mock('../../store/moviesApi', () => ({
    useGetMoviesQuery: jest.fn(),
}));

describe('MovieList', () => {
    const renderComponent = () => render(
        <Router>
            <MovieList/>
        </Router>
    );

    const mockMovies = {
        results: [
            {id: 1, title: 'Movie 1', poster_path: '/path1', overview: 'Overview 1'},
            {id: 2, title: 'Movie 2', poster_path: '/path2', overview: 'Overview 2'},
        ],
        page: 1,
    };

    it('renders loading state', () => {
        (useGetMoviesQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isFetching: true,
        });

        renderComponent();

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useGetMoviesQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: true,
            isFetching: false,
        });

        renderComponent();

        expect(screen.getByText(/Error fetching movies./i)).toBeInTheDocument();
    });

    it('renders movie list', () => {
        (useGetMoviesQuery as jest.Mock).mockReturnValue({
            data: mockMovies,
            error: undefined,
            isFetching: false,
        });

        renderComponent();

        expect(screen.getByText('Movie 1')).toBeInTheDocument();
        expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });

    it('handles search input', () => {
        (useGetMoviesQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isFetching: false,
        });

        renderComponent();

        const searchInput = screen.getByPlaceholderText(/Search for movies/i);
        fireEvent.change(searchInput, {target: {value: 'test'}});

        expect(searchInput).toHaveValue('test');
    });
});
