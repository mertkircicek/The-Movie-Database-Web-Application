
const getPosterURL = (posterPath) => {
    
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
}

const MovieCard = ({ poster_path, name, title, release_date, first_air_date }) => { 
    
    const imageUrl = poster_path ? getPosterURL(poster_path) : 'https://via.placeholder.com/150x225?text=No+Image'; 

    return (
        <div className="flex flex-col pl-5 gap-2">
            <img
                src={imageUrl}
                alt={name}
                className="w-[150px] h-[225px] shadow-sm rounded-md"
            />
            <div className="flex flex-col px-3 w-[150px]">
                <h1 className="font-bold">{name || title}</h1>
                <p className="font-normal text-slate-500">{first_air_date || release_date}</p> 
            </div>
        </div>
    );
}

export default MovieCard;