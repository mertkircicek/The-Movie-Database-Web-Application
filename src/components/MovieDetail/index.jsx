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

    const getRuntime = (runtime) => {
        if (!runtime) return null;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="bg-tmdbDarkBlue p-4">
                <div className="max-w-7xl mx-auto flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold ml-4">{movie.title}</h1>
                </div>
            </div>

            {movie.backdrop_path && (
                <div
                    className="relative h-96 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex items-center p-4 max-w-7xl mx-auto z-10">
                        <h1 className="text-5xl font-bold text-white shadow-lg">{movie.title}</h1>
                    </div>
                </div>
            )}

            <div className="-mt-16 relative max-w-7xl mx-auto p-4 z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                    {getRuntime(movie.runtime)}
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
                                            {actor.profile_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                                    alt={actor.name}
                                                    className="w-16 h-16 mx-auto rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full mb-2 flex items-center justify-center text-xs">
                                                    No Photo
                                                </div>
                                            )}
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