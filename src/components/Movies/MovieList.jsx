import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import tmdb from '../../api/tmdb'; 
import MovieCard from './MovieCard';
import { request } from '../../api/request';
import Blur from '../../baseUI/blur'; 
import { useFavorites } from '../../context/FavoritesContext';


const MovieList = ({ fetch }) => {
    const [movies, setMovies] = useState([]);
    const { toggleFavorite, isFavorite } = useFavorites(); 
    const navigate = useNavigate(); 

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
                    const moviesWithMediaType = data.results.map(item => ({
                        ...item,
                        media_type: apiUrlPath.includes('/movie/') ? 'movie' : 'tv'
                    }));
                    setMovies(moviesWithMediaType);
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

    const handleCardClick = (item) => {
        const { media_type, id } = item;
        navigate(`/${media_type}/${id}`);
    };

    return (
        <div className="flex pb-5 pl-5 pr-9 overflow-x-auto">
            {movies.length > 0 ? (
                movies.map((movie) => { 
                    return (
                        <MovieCard
                            key={movie.id}
                            item={movie}
                            isFavorite={isFavorite(movie.id)} 
                            onToggleFavorite={toggleFavorite}
                            onCardClick={() => handleCardClick(movie)} 
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