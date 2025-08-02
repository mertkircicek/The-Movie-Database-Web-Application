import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast'; 

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);

            if (isAlreadyFavorite) {
                toast.error(`${movie.title || movie.name} removed from favorites!`, {
                    style: { background: 'red', color: 'white' }
                });
                return prevFavorites.filter(fav => fav.id !== movie.id);
            } else {
                toast.success(`${movie.title || movie.name} added to favorites!`);
                return [...prevFavorites, movie];
            }
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};