import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../context/SearchContext';

const Layout = () => {
    const { isSearchOpen, closeSearch } = useSearch();
    const location = useLocation();     
    const navigate = useNavigate();

    const handleSearchSubmit = (query) => {
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query.trim())}`);
            closeSearch(); 
        }
    };

    useEffect(() => {
        if (location.pathname === '/' && isSearchOpen) {
            closeSearch();
        }
    }, [location.pathname, closeSearch, isSearchOpen]);

    const shouldShowSearchBarInLayout = isSearchOpen && location.pathname !== '/';

    return (
        <div>
            <NavBar />
            
            <div className={`pt-2 transition-all duration-300 ${shouldShowSearchBarInLayout ? 'block' : 'hidden'}`}>
                <SearchBar onSubmit={handleSearchSubmit} onClose={closeSearch} isDismissible={true} />
            </div>

            <div> 
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
