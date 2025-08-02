import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tmdb from '../../api/tmdb';

const TVDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tvShow, setTvShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTVShow = async () => {
            try {
                setLoading(true);
                const response = await tmdb.get(`/tv/${id}`, {
                    params: {
                        language: 'en-US',
                        append_to_response: 'credits,videos,images'
                    }
                });
                setTvShow(response.data);
            } catch (err) {
                console.error('Error loading TV show details:', err);
                setError('TV show details could not be loaded.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTVShow();
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

    if (!tvShow) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">TV show not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="bg-tmdbDarkBlue p-4">
                <div className="max-w-7xl mx-auto flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="mr-4 text-white hover:text-gray-300"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold">{tvShow.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="lg:col-span-1">
                        {tvShow.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                alt={tvShow.name}
                                className="w-full rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Poster</span>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold mb-4">{tvShow.name}</h1>

                        {tvShow.tagline && (
                            <p className="text-xl text-gray-300 italic mb-4">"{tvShow.tagline}"</p>
                        )}

                        <div className="flex flex-wrap gap-4 mb-6">
                            {tvShow.first_air_date && (
                                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                    {new Date(tvShow.first_air_date).getFullYear()}
                                </span>
                            )}
                            {tvShow.number_of_seasons && (
                                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                                    {tvShow.number_of_seasons} Season
                                </span>
                            )}
                            {tvShow.vote_average && (
                                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                                    ⭐ {tvShow.vote_average.toFixed(1)}
                                </span>
                            )}
                            {tvShow.status && (
                                <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                                    {tvShow.status}
                                </span>
                            )}
                        </div>

                        {tvShow.genres && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Types:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tvShow.genres.map(genre => (
                                        <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tvShow.overview && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Summary:</h3>
                                <p className="text-gray-300 leading-relaxed">{tvShow.overview}</p>
                            </div>
                        )}

                        {tvShow.credits?.cast && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Cast:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {tvShow.credits.cast.map(actor => (
                                        <div key={actor.id} className="text-center">
                                            {actor.profile_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                    alt={actor.name}
                                                    className="w-16 h-16 mx-auto bg-cover bg-center rounded-full mb-2 object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">No Photo</span>
                                                </div>
                                            )}
                                            <p className="text-sm font-medium">{actor.name}</p>
                                            <p className="text-xs text-gray-400">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tvShow.created_by && tvShow.created_by.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Creators:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tvShow.created_by.map(creator => (
                                        <span key={creator.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                            {creator.name}
                                        </span>
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

export default TVDetail;