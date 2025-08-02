// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import TVDetail from './components/TVDetail';
import PersonDetail from './components/PersonDetail';
import SearchResultsPage from './components/SearchResultsPage'; // Yeni bileşeni import edin
import { FavoritesProvider } from './context/FavoritesContext';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
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
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResultsPage />} /> {/* Yeni rota eklendi */}
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/tv/:id" element={<TVDetail />} />
                    <Route path="/person/:id" element={<PersonDetail />} />
                </Routes>
            </FavoritesProvider>
        </Router>
    );
}

export default App;