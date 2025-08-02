import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tmdb from '../../api/tmdb';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const response = await tmdb.get(`/movie/${id}`, {
                    params: {
                        language: 'en-US',
                        append_to_response: 'credits,videos,images'
                    }
                });
                setMovie(response.data);
            } catch (err) {
                console.error('Error loading movie details:', err);
                setError('Movie details could not be loaded.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Movie not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-tmdbDarkBlue p-4">
                <div className="max-w-7xl mx-auto flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="mr-4 text-white hover:text-gray-300"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold">{movie.title}</h1>
                </div>
            </div>

            {/* Movie Content */}
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="lg:col-span-1">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No posters</span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                        
                        {movie.tagline && (
                            <p className="text-xl text-gray-300 italic mb-4">"{movie.tagline}"</p>
                        )}

                        <div className="flex flex-wrap gap-4 mb-6">
                            {movie.release_date && (
                                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                            )}
                            {movie.runtime && (
                                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}sec
                                </span>
                            )}
                            {movie.vote_average && (
                                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                        </div>

                        {movie.genres && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Types:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map(genre => (
                                        <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {movie.overview && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Summary:</h3>
                                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                            </div>
                        )}

                        {movie.credits?.cast && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Cast:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {movie.credits.cast.slice(0, 8).map(actor => (
                                        <div key={actor.id} className="text-center">
                                            <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full mb-2"></div>
                                            <p className="text-sm font-medium">{actor.name}</p>
                                            <p className="text-xs text-gray-400">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail; 