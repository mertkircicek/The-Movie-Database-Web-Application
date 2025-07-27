const SearchButton = (props) => { 
    return <button {...props} className = "h-11 text-white font-bold px-7 py-3 rounded-[8rem] bg-green-200 bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue hover:text-tmdbDarkBlue inline-flex justify-center items-center ">
        Search
    </button>
}

export default SearchButton;
