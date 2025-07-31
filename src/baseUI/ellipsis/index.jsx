import FontAwesomeIcon from "react-fontawesome";

const Ellipsis = () => {
    return <div className="w-full h-full bg-white/50 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-tmdbLightBlue">
        <div className="scale-[0.42] flex gap-[2px] text-[0.8rem] text-gray-700 pl-[2px]">
            <FontAwesomeIcon name="circle" />
            <FontAwesomeIcon name="circle" />
            <FontAwesomeIcon name="circle" />
        </div>

    </div>
} 

export default Ellipsis;