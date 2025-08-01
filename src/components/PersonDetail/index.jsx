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
                        language: 'tr-TR',
                        append_to_response: 'credits,images'
                    }
                });
                setPerson(response.data);
            } catch (err) {
                console.error('Kişi detayları yüklenirken hata:', err);
                setError('Kişi detayları yüklenemedi.');
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
                <div className="text-white text-xl">Yükleniyor...</div>
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
                <div className="text-white text-xl">Kişi bulunamadı.</div>
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
                        ← Geri
                    </button>
                    <h1 className="text-2xl font-bold">{person.name}</h1>
                </div>
            </div>

            {/* Person Content */}
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Image */}
                    <div className="lg:col-span-1">
                        {person.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                alt={person.name}
                                className="w-full rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">Fotoğraf Yok</span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold mb-4">{person.name}</h1>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {person.birthday && (
                                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                    {new Date(person.birthday).toLocaleDateString('tr-TR')}
                                </span>
                            )}
                            {person.place_of_birth && (
                                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                                    {person.place_of_birth}
                                </span>
                            )}
                            {person.popularity && (
                                <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                                    ⭐ {person.popularity.toFixed(1)}
                                </span>
                            )}
                        </div>

                        {person.biography && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Biyografi:</h3>
                                <p className="text-gray-300 leading-relaxed">{person.biography}</p>
                            </div>
                        )}

                        {person.known_for_department && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Bilinen Alan:</h3>
                                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                    {person.known_for_department}
                                </span>
                            </div>
                        )}

                        {person.credits?.cast && person.credits.cast.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Oyuncu Olarak:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {person.credits.cast.slice(0, 6).map(movie => (
                                        <div key={movie.id} className="bg-gray-800 p-3 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                {movie.poster_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                        alt={movie.title || movie.name}
                                                        className="w-12 h-18 rounded"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-18 bg-gray-700 rounded"></div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-sm">{movie.title || movie.name}</p>
                                                    <p className="text-xs text-gray-400">{movie.character}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                                                         movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {person.credits?.crew && person.credits.crew.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Ekip Olarak:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {person.credits.crew.slice(0, 6).map(movie => (
                                        <div key={movie.id} className="bg-gray-800 p-3 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                {movie.poster_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                        alt={movie.title || movie.name}
                                                        className="w-12 h-18 rounded"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-18 bg-gray-700 rounded"></div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-sm">{movie.title || movie.name}</p>
                                                    <p className="text-xs text-gray-400">{movie.job}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                                                         movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : ''}
                                                    </p>
                                                </div>
                                            </div>
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

export default PersonDetail; 