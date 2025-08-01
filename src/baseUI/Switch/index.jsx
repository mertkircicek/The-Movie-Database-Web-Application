import { useState, useRef, useLayoutEffect } from "react";

// props olarak `selectedItem`ı alın.
const Switch = ({ items, onToogle, selectedItem }) => {
    // selectedItem'ın dizideki indeksini buluruz.
    // Bu, dışarıdan gelen aktif öğeyi görsel olarak vurgulamak için kullanılır.
    const selectedIndex = items.indexOf(selectedItem);

    const itemRefs = useRef([]);
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

    // selectedIndex veya items değiştiğinde kayan arka planın stilini günceller.
    useLayoutEffect(() => {
        if (itemRefs.current[selectedIndex] && items.length > 0) {
            const selectedElement = itemRefs.current[selectedIndex];
            const width = selectedElement.offsetWidth;
            let left = 0;

            // Seçili öğenin sol konumunu hesaplarız.
            for (let i = 0; i < selectedIndex; i++) {
                if (itemRefs.current[i]) {
                    left += itemRefs.current[i].offsetWidth;
                }
            }

            setSliderStyle({ left: left, width: width });
        }
    }, [selectedIndex, items]); 

    // Aktif öğe için kullanılacak Tailwind CSS sınıfı.
    const activeTextColor =
        "bg-clip-text text-transparent bg-gradient-to-r from-[#c0fecf] to-[#1ed5a9]";

    return (
        <div className="hover:cursor-pointer h-8 border-solid border-tmdbDarkBlue rounded-[30px] border-[1px] font-semibold flex items-center relative z-[1] ">
            {items.map((item, index) => (
                <div
                    key={index} 
                    ref={(el) => (itemRefs.current[index] = el)}
                    // Tıklama olayında `onToogle` fonksiyonunu çağırırız ve
                    // tıklanan öğenin metnini (örn. "On TV") göndeririz.
                    onClick={() => onToogle(item)}
                    className={`py-1 px-5 h-8 rounded-[30px] flex items-center justify-center whitespace-nowrap ${
                        // selectedIndex'i kullanarak doğru öğeyi vurgulayın.
                        selectedIndex === index ? activeTextColor : ""
                    }`}
                >
                    {item}
                </div>
            ))}
            
            {/* Kayan arka plan (slider) elementi */}
            <div
                className="h-8 bg-tmdbDarkBlue rounded-[30px] absolute z-[-1] transition-all duration-300 ease-in-out" 
                style={sliderStyle} 
            ></div>
        </div>
    );
};

export default Switch;