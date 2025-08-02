import { useEffect, useState } from 'react';
import tmdb from '../../api/tmdb'; 
import MovieCard from './MovieCard';
import { request } from '../../api/request';
import Blur from '../../baseUI/blur'; 
import { useFavorites } from '../../context/FavoritesContext';


const MovieList = ({ fetch }) => {
    const [movies, setMovies] = useState([]);
    const { toggleFavorite, isFavorite } = useFavorites(); 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                
                const apiUrlPath = request[fetch];
                
                if (!apiUrlPath) {
                    console.error(`An API path was not found for '${fetch}' in request.js`);
                    setMovies([]);
                    return;
                }

                const { data } = await tmdb.get(apiUrlPath);
                
                if (data && Array.isArray(data.results)) {
                    setMovies(data.results);
                } else {
                    console.warn(`The 'results' field from the API is not an array or is empty:`, data);
                    setMovies([]);
                }
            } catch (error) {
                console.error("An error occurred while fetching movies:", error);
                setMovies([]);
            }
        };
        fetchMovies();
    }, [fetch]); 

    return (
        <div className="flex pb-5 pl-5 pr-9 overflow-x-auto">
            {movies.length > 0 ? (
                movies.map((movie) => { 
                    return (
                        <MovieCard
                            key={movie.id}
                            {...movie}
                            isFavorite={isFavorite(movie.id)} 
                            onToggleFavorite={() => toggleFavorite(movie)} 
                        />
                    );
                })
            ) : (
                <p className="p-5 text-center text-slate-500">Movies are loading or not found...</p>
            )}
            <div className="absolute top-0 right-0 w-16 h-full">
                <Blur />
            </div>
        </div> 
    );
};

export default MovieList;