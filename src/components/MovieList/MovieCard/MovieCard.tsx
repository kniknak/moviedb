import React from 'react';
import {Link} from 'react-router-dom';
import styles from './MovieCard.module.scss';

export interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        poster_path?: string;
        overview: string;
    };
}

const MovieCard = ({movie}: MovieCardProps) => (
    <div className={styles.movieCard}>
        <Link to={`/movie/${movie.id}`}>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                />
            )}
        </Link>
        <div className={styles.movieInfo}>
            <Link to={`/movie/${movie.id}`} data-testid="link">
                <h2 className={styles.movieInfoTitle}>{movie.title}</h2>
            </Link>
            <p className={styles.movieDescription}>
                {movie.overview}
                <br/><br/><br/>
            </p>
        </div>
    </div>
);

export default MovieCard;
