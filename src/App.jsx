import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import TVDetail from './components/TVDetail';
import PersonDetail from './components/PersonDetail';
import SearchResultsPage from './components/SearchResultsPage'; 
import FavoritesPage from './components/FavoritesPage';

import Layout from './Layouts/Layout'; 
import { SearchProvider } from './context/SearchContext'; 
import { FavoritesProvider } from './context/FavoritesContext';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
            <SearchProvider> 
                <FavoritesProvider>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            success: {
                                style: {
                                    background: 'green',
                                    color: 'white',
                                },
                            },
                        }}
                    />
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            
                            <Route path="search" element={<SearchResultsPage />} />
                            <Route path="favorites" element={<FavoritesPage />} />
                            <Route path="movie/:id" element={<MovieDetail />} />
                            <Route path="tv/:id" element={<TVDetail />} />
                            <Route path="person/:id" element={<PersonDetail />} />
                        </Route>
                    </Routes>
                </FavoritesProvider>
            </SearchProvider>
        </Router>
    );
}

export default App;
