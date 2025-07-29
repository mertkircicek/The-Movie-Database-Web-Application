import { useState, useRef, useLayoutEffect } from "react";

const Switch = ({ items, onToogle, isToogled }) => {
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  
  const itemRefs = useRef([]);

  
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  
  useLayoutEffect(() => {
    
    if (itemRefs.current[selectedIndex] && items.length > 0) {
      
      const selectedElement = itemRefs.current[selectedIndex];
      const width = selectedElement.offsetWidth;
      let left = 0;

      
      for (let i = 0; i < selectedIndex; i++) {
        if (itemRefs.current[i]) {
          left += itemRefs.current[i].offsetWidth;
        }
      }

      
      setSliderStyle({ left: left, width: width });
    }
  }, [selectedIndex, items]); 

  
  const handleItemClick = (index) => {
    setSelectedIndex(index); 
    if (onToogle) {
      onToogle(items[index]);
    }
  };

  
  const activeTextColor =
    "bg-clip-text text-transparent bg-gradient-to-r from-[#c0fecf] to-[#1ed5a9]";

  

  return (
    <div className="hover:cursor-pointer h-8 border-solid border-tmdbDarkBlue rounded-[30px] border-[1px] font-semibold flex items-center relative z-[1] ">
      
      {items.map((item, index) => (
        <div
          key={index} 
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => handleItemClick(index)} 
          className={`py-1 px-5 h-8 rounded-[30px] flex items-center justify-center whitespace-nowrap ${
            
            selectedIndex === index ? activeTextColor : ""
          }`}
        
        >
          {item}
        </div>
      ))}

      
      <div
        className="h-8 bg-tmdbDarkBlue rounded-[30px] absolute z-[-1] transition-all duration-300 ease-in-out" 
        style={sliderStyle} 
      ></div>
    </div>
  );
};

export default Switch;