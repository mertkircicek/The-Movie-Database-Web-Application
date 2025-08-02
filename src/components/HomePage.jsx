import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Banner from './Banner';
import Container from '../Layouts/Container';
import Section from '../Layouts/Section'; 
import MovieList from './Movies/MovieList';

const HomePage = () => {

    const [selectedCategory, setSelectedCategory] = useState("Streaming");

    const categories = ["Streaming", "On TV", "For Rent", "In Theaters"];

    const handleCategoryChange = (selectedValue) => {
        setSelectedCategory(selectedValue);
    };

    return (
        <>
            <Header />
            <SearchBar />
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