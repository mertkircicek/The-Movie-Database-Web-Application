import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tmdb from '../api/tmdb';

const SearchResultsPage = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [activeFilter, setActiveFilter] = useState('All');

    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (!searchQuery) {
            setLoading(false);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const response = await tmdb.get('/search/multi', {
                    params: {
                        query: searchQuery,
                        language: 'en-US',
                        page: 1
                    }
                });
                
                const allResults = response.data.results;
                setResults(allResults);

                const counts = allResults.reduce((acc, item) => {
                    if (item.media_type in acc) {
                        acc[item.media_type]++;
                    } else {
                        acc[item.media_type] = 1;
                    }
                    return acc;
                }, {});

                setCategoryCounts({
                    All: allResults.length,
                    ...counts
                });
            } catch (err) {
                console.error('Search error:', err);
                setError('An error occurred while fetching search results.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredResults(results);
        } else {
            setFilteredResults(results.filter(item => item.media_type === activeFilter));
        }
    }, [activeFilter, results]);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-tmdbDarkBlue text-white flex items-center justify-center">
                <div className="text-xl">Loading search results...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-tmdbDarkBlue text-red-500 flex items-center justify-center">
                <div className="text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-tmdbDarkBlue text-white pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 p-4 bg-tmdbLightBlue rounded-lg shadow-lg h-fit">
                    <h2 className="text-2xl font-bold mb-4 text-white">Search Results</h2>
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
                    {filteredResults.length === 0 ? (
                        <div className="text-xl text-center mt-8">
                            No results found for "{searchQuery}".
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredResults.map((item) => (
                                <div
                                    key={item.id}
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
    );
};

export default SearchResultsPage;