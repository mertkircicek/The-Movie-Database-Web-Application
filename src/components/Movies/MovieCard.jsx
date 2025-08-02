import React from 'react';
import ProgressCircle from "../../baseUI/progress-circle";
import Ellipsis from "../../baseUI/ellipsis";
import { FaStar, FaRegStar } from 'react-icons/fa'; 

const getPosterURL = (posterPath) => { 
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
};

const MovieCard = ({ poster_path, name, title, release_date, vote_average, first_air_date, isFavorite, onToggleFavorite, id }) => { 
    const imageUrl = poster_path ? getPosterURL(poster_path) : 'https://via.placeholder.com/150x225?text=No+Image'; 

    return (
        <div className="flex flex-col pl-5 gap-2 relative">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={name || title}
                    className="w-[150px] h-[225px] shadow-sm rounded-md"
                />
                <div className="absolute bottom-[-1.2rem] left-2">
                    <ProgressCircle percent={vote_average * 10}/>
                </div>
                <div className="absolute top-3 right-[10px] w-[1.4rem] h-[1.4rem]">
                    <Ellipsis />
                </div>
                
                <div 
                    className="absolute top-3 left-3 cursor-pointer text-yellow-400" 
                    onClick={() => onToggleFavorite(id)} 
                >
                    {isFavorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
                </div>
            </div>
            
            <div className="flex flex-col px-3 pt-5 w-[150px]">
                <h1 className="font-bold hover:cursor-pointer hover:text-tmdbLightBlue">{name || title}</h1>
                <p className="font-normal text-slate-500">{first_air_date || release_date}</p> 
            </div>
        </div>
    );
};

export default MovieCard;