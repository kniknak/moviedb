import React, {useState, useMemo} from 'react';
import {useGetMoviesQuery} from '../../store/moviesApi';
import {debounce} from 'lodash';
import MovieCard from './MovieCard/MovieCard';
import styles from './MovieList.module.scss';
import {useNavigate, useParams} from "react-router-dom";

const useMoviesData = () => {
    const { page: currentPage }  = useParams();
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const page = Number(currentPage) || 1;
    const {data, error, isFetching} = useGetMoviesQuery({page: Math.ceil(page / 2), query});

    const throttledSetQuery = useMemo(
        () => debounce((value: string) => setQuery(value), 300),
        []
    );

    const setPage = (page: number) => navigate(page === 1 ? '/' : '/' + page);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        throttledSetQuery(e.target.value);
        setPage(1);
    };

    const results = !isFetching && data?.results
        ? (page % 2 ? data.results.slice(0, 10) : data.results.slice(10, 20))
        : undefined;

    const hasResults = !!data?.total_results

    const isNextDisabled = !data?.results
        || (data.results.length <= 10)
        || data?.total_pages === Math.floor(page / 2)

    const isPrevDisabled = page === 1

    return {
        search,
        handleSearch,
        isPrevDisabled,
        page,
        setPage,
        isNextDisabled,
        isLoading: isFetching,
        error,
        hasResults,
        results,
    }
}

const MovieList = () => {
    const {
        search,
        handleSearch,
        isPrevDisabled,
        page,
        setPage,
        isNextDisabled,
        isLoading,
        error,
        hasResults,
        results,
    } = useMoviesData()

    const onPrevClick = () => setPage(Math.max(page - 1, 1))
    const onNextClick = () => setPage(page + 1)

    return (
        <div className={styles.movieList}>
            <h1 className={styles.movieListTitle}>Movie List</h1>
            <input
                type="text"
                placeholder="Search for movies"
                value={search}
                onChange={handleSearch}
                className={styles.searchInput}
            />
            <div className={styles.pagination}>
                <button
                    onClick={onPrevClick}
                    disabled={isPrevDisabled}
                    className={styles.paginationButton}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    onClick={onNextClick}
                    disabled={isNextDisabled}
                    className={styles.paginationButton}
                >
                    Next
                </button>
            </div>
            {isLoading && <p className={styles.preloader}>Loading...</p>}
            {error && <p className={styles.error}>Error fetching movies.</p>}
            {!hasResults && <p className={styles.preloader}>No results found</p>}
            <div className={styles.movieCards}>
                {results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
