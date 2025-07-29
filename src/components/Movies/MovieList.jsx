import { useEffect, useState } from 'react';
import tmdb from '../../api/tmdb';
import MovieCard from './MovieCard';
import { request } from '../../api/request'; 
import Blur from '../../baseUI/blur';


const MovieList = ({ fetch }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const { data } = await tmdb.get(request[fetch]);
        setMovies(data.results);
      } catch (error) {
        console.error("Filmler çekilirken bir hata oluştu:", error);
        
      }
    }
    fetchMovies();
  }, [fetch]); 


  return (
    <div className="flex pb-5 pl-5 pr-9 overflow-x-auto">
      {movies.map((movie) => { 
        return <MovieCard key={movie.id} {...movie} />
      })}
      <div className="absolute top-0 right-0 w-16 h-full">
        <Blur />
      </div>
    </div> 
  );
}

export default MovieList;
