import React, { useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Container from './Layouts/Container';
import Section from './Layouts/Section'; 
import MovieList from './components/Movies/MovieList';

function App() {
    
    const [selectedCategory, setSelectedCategory] = useState("Streaming");

    
    const handleCategoryChange = (selectedValue) => {
        setSelectedCategory(selectedValue);
    };

    return (
        <>
            <Header />
            <Container>
                <Banner />
                
                <Section
                    title="What's Popular"
                    items={["Streaming", "On TV", "For Rent", "In Theaters"]}
                    onToogle={handleCategoryChange} 
                >
                    
                    <MovieList fetch={selectedCategory} />
                </Section>
            </Container>
        </>
    );
}

export default App;
