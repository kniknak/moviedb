import React from 'react';
import {render, screen} from '@testing-library/react';
import {useGetMovieDetailsQuery} from '../../store/moviesApi';
import MovieDetails from './MovieDetails';

jest.mock('../../store/moviesApi', () => ({
    useGetMovieDetailsQuery: jest.fn(),
}));


describe('MovieDetails', () => {
    it('renders loading state', () => {
        (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
        });

        render(<MovieDetails/>);

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders error state', async () => {
        (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: true,
            isLoading: false,
        });

        render(<MovieDetails/>);

        expect(await screen.findByText(/Error fetching movie details./i)).toBeInTheDocument();
    });

    it('renders movie details', async () => {
        const mockMovieDetails = {
            id: 1,
            title: 'Test Movie',
            poster_path: '/testpath.jpg',
            release_date: '2023-01-01',
            vote_average: 8.5,
            genres: [{name: 'Action'}, {name: 'Drama'}],
            overview: 'This is a test movie overview.',
        };

        (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
            data: mockMovieDetails,
            error: undefined,
            isLoading: false,
        });

        render(<MovieDetails/>);

        expect(await screen.findByText('Test Movie')).toBeInTheDocument();
        expect(await screen.findByText('Release Date: 2023-01-01')).toBeInTheDocument();
        expect(await screen.findByText('Rating: 8.5 / 10')).toBeInTheDocument();
        expect(await screen.findByText('Genres: Action, Drama')).toBeInTheDocument();
        expect(await screen.findByText('This is a test movie overview.')).toBeInTheDocument();
        const imgElement = screen.getByRole('img');
        expect(imgElement).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/testpath.jpg');
        expect(imgElement).toHaveAttribute('alt', 'Test Movie');
    });
});
