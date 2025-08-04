import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdb from '../../api/tmdb';
import { FaFilm, FaTv, FaUser, FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    const searchInputRef = useRef();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowResults(false);
                setSearchResults([]);
                setSearchQuery('');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const query = searchQuery.trim();
            if (query) {
                navigate(`/search?query=${encodeURIComponent(query)}`);
                setSearchResults([]);
                setShowResults(false);
                setSearchQuery('');
            }
        }
    };

    const handleResultClick = (item) => {
        const { media_type, id } = item;
        navigate(`/${media_type}/${id}`);
        setSearchResults([]);
        setShowResults(false);
        setSearchQuery('');
    };

    const handleSearchClick = (query) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setSearchResults([]);
        setShowResults(false);
        setSearchQuery('');
    };

    const searchMulti = async (query) => {
        try {
            setIsSearching(true);
            const response = await tmdb.get('/search/multi', {
                params: {
                    query: query,
                    language: 'en-US',
                    page: 1
                }
            });
            
            const results = response.data.results.filter(item => 
                (item.media_type === 'movie' || item.media_type === 'tv' || item.media_type === 'person') && 
                (item.poster_path || item.profile_path)
            ).slice(0, 10);
            
            setSearchResults(results);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery && searchQuery.length >= 3) {
                searchMulti(searchQuery);
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.length < 3) {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const getMediaTypeIcon = (mediaType) => {
        switch (mediaType) {
            case 'movie': return <FaFilm className="text-gray-600 w-5 h-5" />;
            case 'tv': return <FaTv className="text-gray-600 w-5 h-5" />;
            case 'person': return <FaUser className="text-gray-600 w-5 h-5" />;
            default: return <FaSearch className="text-gray-600 w-5 h-5" />;
        }
    };
    
    const getTitle = (item) => {
        if (item.media_type === 'person') {
            return item.name;
        }
        return item.title || item.name;
    };
    
    const getFormattedTitle = (item) => {
        const title = getTitle(item);
        let typeText = '';
        if (item.media_type === 'movie') typeText = 'in Movies';
        else if (item.media_type === 'tv') typeText = 'in TV Shows';
        else if (item.media_type === 'person') typeText = 'in People';

        return (
            <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{title}</span>
                <span className="text-sm text-gray-500">{typeText}</span>
            </div>
        );
    };

    return (
        <div className="relative w-full px-4 py-4" ref={containerRef}>
            <div className="relative">
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 text-lg text-gray-900 placeholder-gray-500 focus:outline-none"
                    placeholder="Search for a movie, tv show, or person"
                    onFocus={() => { if(searchResults.length > 0) setShowResults(true); }}
                    onKeyDown={handleKeyDown}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {showResults && (
                <div className="absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {isSearching ? (
                        <div className="p-4 text-center text-gray-500">
                            Searching...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div>
                            {searchResults.slice(0, 3).map((item, index) => (
                                <div 
                                    key={`${item.media_type}-${item.id}`}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleResultClick(item)}
                                >
                                    <div className="flex items-center gap-3">
                                        {getMediaTypeIcon(item.media_type)}
                                        <div className="flex-1">
                                            {getFormattedTitle(item)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {searchResults.length > 3 && (
                                <div className="p-3 border-t border-gray-200">
                                    <div className="text-sm font-semibold text-gray-500 mb-2">Related Searches</div>
                                    {searchResults.slice(3).map((item, index) => (
                                        <div
                                            key={`${item.media_type}-${item.id}-${index}`}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                            onClick={() => handleSearchClick(getTitle(item))}
                                        >
                                            <FaSearch className="text-gray-400 w-4 h-4" />
                                            <span className="text-gray-700">{getTitle(item)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : searchQuery.length >= 3 ? (
                        <div className="p-4 text-center text-gray-500">
                            No results found.
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchBar;