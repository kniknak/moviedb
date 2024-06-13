import React from 'react';
import {useParams} from 'react-router-dom';
import {useGetMovieDetailsQuery} from '../../store/moviesApi';
import styles from './MovieDetails.module.scss';

const Wrapper = ({children}: { children: React.ReactNode }) => (
    <div className={styles.movieDetails}>
        <div className={styles.movieDetailsContainer}>
            <h1 className={styles.movieDetailsTitle}>Movie Details</h1>
            <div className={styles.movieCard}>
                {children}
            </div>
        </div>
    </div>
);

/**
 * there could be a reuse of MovieCard component, but I believe that it would
 * lead to unneeded complexity to maintain diverging with the (future) changes
 */
const MovieDetails = () => {
    const {id} = useParams<{ id: string }>();
    const {data, error, isLoading} = useGetMovieDetailsQuery(Number(id));

    if (isLoading) {
        return (
            <Wrapper>
                <div className={styles.loading}>Loading...</div>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <div className={styles.loading}>Error fetching movie details.</div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {data?.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                    alt={data?.title}
                    className={styles.moviePoster}
                />
            )}
            <div className={styles.movieInfo}>
                <h2 className={styles.movieInfoTitle}>{data?.title}</h2>
                <p className={styles.releaseDate}>Release Date: {data?.release_date}</p>
                <p className={styles.rating}>Rating: {data?.vote_average} / 10</p>
                <p className={styles.genres}>
                    Genres: {data?.genres.map((genre: { name: string }) => genre.name).join(', ')}
                </p>
                <p className={styles.overview}>{data?.overview}</p>
            </div>
        </Wrapper>
    );
};

export default MovieDetails;
