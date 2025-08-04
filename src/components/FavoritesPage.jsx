import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { FaArrowLeft } from 'react-icons/fa'; 

const FavoritesPage = () => {
    const { favorites } = useFavorites();
    const navigate = useNavigate(); 
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const counts = favorites.reduce((acc, item) => {
            const mediaType = item.media_type;
            if (mediaType in acc) {
                acc[mediaType]++;
            } else {
                acc[mediaType] = 1;
            }
            return acc;
        }, {});

        setCategoryCounts({
            All: favorites.length,
            ...counts
        });

        if (activeFilter === 'All') {
            setFilteredFavorites(favorites);
        } else {
            setFilteredFavorites(favorites.filter(item => item.media_type === activeFilter));
        }
    }, [favorites, activeFilter]);

    const getTitle = (item) => {
        return item.title || item.name;
    };

    const getPosterUrl = (path, size = 'w200') => {
        if (!path) return 'https://via.placeholder.com/200x300?text=No+Image';
        return `https://image.tmdb.org/t/p/${size}${path}`;
    };

    const getReleaseDate = (item) => {
        const date = item.release_date || item.first_air_date;
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleResultClick = (item) => {
        const { media_type, id } = item;
        navigate(`/${media_type}/${id}`);
    };

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen bg-tmdbDarkBlue text-white flex items-center justify-center">
                <div className="text-xl">Your favorites list is empty.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-tmdbDarkBlue text-white pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <button
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 mb-8 text-gray-300 hover:text-white transition-colors"
                >
                    <FaArrowLeft />
                    <span>Back</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 p-4 bg-tmdbLightBlue rounded-lg shadow-lg h-fit">
                        <h2 className="text-2xl font-bold mb-4 text-white">My Favorites</h2>
                        <ul className="space-y-2">
                            {['All', 'movie', 'tv', 'person'].map(filter => (
                                <li 
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex justify-between items-center px-4 py-2 rounded-md cursor-pointer ${
                                        activeFilter === filter 
                                            ? 'bg-tmdbDarkBlue text-white' 
                                            : 'hover:bg-gray-700 text-white'
                                    }`}
                                >
                                    <span className="capitalize">{filter}</span>
                                    <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        {categoryCounts[filter] || 0}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        {filteredFavorites.length === 0 ? (
                            <div className="text-xl text-center mt-8">
                                No favorites found in this category.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredFavorites.map((item) => (
                                    <div
                                        key={`${item.media_type}-${item.id}`}
                                        className="flex bg-tmdbLightBlue rounded-lg shadow-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                                        onClick={() => handleResultClick(item)}
                                    >
                                        <div className="flex-shrink-0 w-[94px] h-[141px]">
                                            <img
                                                src={getPosterUrl(item.poster_path || item.profile_path, 'w94_and_h141_face')}
                                                alt={getTitle(item)}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">{getTitle(item)}</h3>
                                            <p className="text-sm text-gray-300 mb-2">
                                                {getReleaseDate(item)}
                                            </p>
                                            <p className="text-gray-200 text-sm line-clamp-3">
                                                {item.overview || 'No summary available.'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;