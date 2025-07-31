const ProgressCircle = ({percent}) => {

    const dashArray = Math.PI * 100;
    const dashOffset = Math.PI * (100-percent) 

    const bar = {
        low: "#db2360",
        medium: "#d2d531",
        high: "#21d07a",
        none: "#d4d4d4"
    }

    const track = {
        low: "#571435",
        medium: "423d0f",
        high: "#204529",
        none: "666666"
    }

    const getColor = (rating) => {
        if(rating>=70) return "high";
        if(rating>=40) return "medium";
        if(rating>0) return "low";
        return "none"
    }

    const roundedPercent = Math.round(percent);

    return <div className="w-[38px] h-[38px] bg-tmdbDarkBlue rounded-full flex justify-center items-center" >
        <svg width="34px" height="34px" viewBox="0 0 100 100" className="rotate-[-90deg]">
            <circle cx="52.5" cy="52.5" r="50" 
            fill="transparent" 
            stroke={track[getColor(percent)]} strokeWidth={6}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className="scale-[0.95]"
            />
            <circle cx="52.5" cy="52.5" r="50" 
            fill="transparent" 
            stroke={bar[getColor(percent)]} strokeWidth={6}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className="scale-[0.95]"
            strokeLinecap="round"
            />
        </svg>
        <div className="font-semibold absolute text-white">
            {percent ? <div> {roundedPercent} <span className="absolute text-[4px] top-[5px]">%</span></div> : "NR"}
        </div>
    </div>
}

export default ProgressCircle;