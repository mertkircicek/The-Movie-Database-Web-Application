import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdb from '../../api/tmdb';

const SearchBar = () => {
    const searchInputRef = useRef();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const query = searchInputRef.current.value;
        if (query.trim()) {
            alert(`Looking for: ${query}`);
        }
    };

    const handleResultClick = (item) => {
        const { media_type, id } = item;
        
        switch (media_type) {
            case 'movie':
                navigate(`/movie/${id}`);
                break;
            case 'tv':
                navigate(`/tv/${id}`);
                break;
            case 'person':
                navigate(`/person/${id}`);
                break;
            default:
                break;
        }
        
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
                    language: 'tr-TR',
                    page: 1
                }
            });
            
            const results = response.data.results.filter(item => 
                item.media_type === 'movie' || 
                item.media_type === 'tv' || 
                item.media_type === 'person'
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

    const getMediaTypeText = (mediaType) => {
        switch (mediaType) {
            case 'movie': return 'Movie';
            case 'tv': return 'TV Show';
            case 'person': return 'Person';
            default: return 'Other';
        }
    };

    const getTitle = (item) => {
        if (item.media_type === 'person') {
            return item.name;
        }
        return item.title || item.name;
    };

    return (
        <div className="relative w-full px-4 py-4">
            <div className="relative">
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 text-lg text-gray-900 placeholder-gray-500 focus:outline-none"
                    placeholder="Search for a movie, tv show, or person"
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
                            Aranıyor...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div>
                            {searchResults.map((item, index) => (
                                <div 
                                    key={`${item.media_type}-${item.id}-${index}`}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleResultClick(item)}
                                >
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">
                                                {getTitle(item)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {getMediaTypeText(item.media_type)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : searchQuery.length >= 3 ? (
                        <div className="p-4 text-center text-gray-500">
                            No results found
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 