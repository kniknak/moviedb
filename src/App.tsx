import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Header from './components/Header/Header';
import {ErrorBoundary, FallbackProps} from "react-error-boundary";

const ErrorMessage = ({error}: FallbackProps) => {
    return (
        <div>
            <p>Something went wrong:</p>
            <pre style={{color: "red"}}>{error.message}</pre>
        </div>
    );
}

const App: React.FC = () => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorMessage}
            onError={console.error}
        >
            <Provider store={store}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" Component={MovieList}/>
                        <Route path="/:page" Component={MovieList}/>
                        <Route path="/movie/:id" Component={MovieDetails}/>
                    </Routes>
                </Router>
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
