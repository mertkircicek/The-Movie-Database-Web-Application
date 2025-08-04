import React, { useState } from 'react';
import SearchBar from './SearchBar'; // SearchBar'ı import ediyoruz
import Banner from './Banner';
import Container from '../Layouts/Container';
import Section from '../Layouts/Section'; 
import MovieList from './Movies/MovieList';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Streaming");
    const navigate = useNavigate();

    const categories = ["Streaming", "On TV", "For Rent", "In Theaters"];

    const handleCategoryChange = (selectedValue) => {
        setSelectedCategory(selectedValue);
    };

    const handleHomePageSearchSubmit = (query) => {
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <>
            <SearchBar onSubmit={handleHomePageSearchSubmit} /> 

            <Container>
                <Banner />
                <Section
                    title="What's Popular"
                    items={categories}
                    onToogle={handleCategoryChange} 
                    selectedItem={selectedCategory}
                >
                    <MovieList fetch={selectedCategory} />
                </Section>
            </Container>
        </>
    );
};

export default HomePage;
