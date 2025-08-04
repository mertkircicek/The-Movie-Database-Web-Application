import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tmdb from '../../api/tmdb';

const PersonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                setLoading(true);
                const response = await tmdb.get(`/person/${id}`, {
                    params: {
                        language: 'en-US',
                        append_to_response: 'combined_credits,images' 
                    }
                });
                setPerson(response.data);
            } catch (err) {
                console.error('Error loading person details:', err);
                setError('Person details could not be loaded.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPerson();
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

    if (!person) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Person not found.</div>
            </div>
        );
    }

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
                    <h1 className="text-2xl font-bold ml-4">{person.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        {person.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                alt={person.name}
                                className="w-full rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Photo</span>
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold mb-4">{person.name}</h1>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {person.birthday && (
                                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                    Birthday: {new Date(person.birthday).toLocaleDateString('en-US')}
                                </span>
                            )}
                            {person.place_of_birth && (
                                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                                    Born in: {person.place_of_birth}
                                </span>
                            )}
                            {person.popularity && (
                                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                                    ⭐ {person.popularity.toFixed(1)}
                                </span>
                            )}
                            {person.known_for_department && (
                                <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                                    Known for: {person.known_for_department}
                                </span>
                            )}
                        </div>

                        {person.biography && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Biography:</h3>
                                <p className="text-gray-300 leading-relaxed">{person.biography}</p>
                            </div>
                        )}
                    </div>
                </div>

                {person.combined_credits?.cast?.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Known for (Actor)</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {person.combined_credits.cast.slice(0, 8).map(item => (
                                <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                    {item.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                                            alt={item.title || item.name}
                                            className="w-full h-auto object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-center">
                                            <span className="text-gray-400 p-2">No Poster Available</span>
                                        </div>
                                    )}
                                    <div className="p-3">
                                        <h4 className="font-medium text-sm truncate">{item.title || item.name}</h4>
                                        <p className="text-xs text-gray-400 truncate">as {item.character}</p>
                                        <p className="text-xs text-gray-500">
                                            {item.release_date ? new Date(item.release_date).getFullYear() :
                                             item.first_air_date ? new Date(item.first_air_date).getFullYear() : ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonDetail;