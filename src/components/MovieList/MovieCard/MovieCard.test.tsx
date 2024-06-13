import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import MovieCard, {MovieCardProps} from './MovieCard';

describe('MovieCard', () => {
    const mockMovie = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/testpath.jpg',
        overview: 'This is a test movie overview.',
    };

    const mockMovieWithoutPoster = {
        id: 1,
        title: 'Test Movie',
        overview: 'This is a test movie overview.',
    };

    const renderComponent = (movie: MovieCardProps['movie']) => render(
        <Router>
            <MovieCard movie={movie}/>
        </Router>
    );

    it('renders movie title and overview', () => {
        renderComponent(mockMovie);

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('This is a test movie overview.')).toBeInTheDocument();
    });

    it('renders movie poster when poster_path is provided', () => {
        renderComponent(mockMovie);

        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/testpath.jpg');
        expect(imgElement).toHaveAttribute('alt', 'Test Movie');
    });

    it('does not render movie poster when poster_path is not provided', () => {
        renderComponent(mockMovieWithoutPoster);

        const imgElement = screen.queryByRole('img');
        expect(imgElement).not.toBeInTheDocument();
    });

    it('renders correct link for the movie', () => {
        renderComponent(mockMovie);

        const linkElement = screen.getByTestId('link');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/movie/1');
    });
});
