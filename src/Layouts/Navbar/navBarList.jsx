import React from 'react';
import { Link } from 'react-router-dom'; 
import FontAwesomeIcon from "react-fontawesome";
import { useSearch } from '../../context/SearchContext'; 

const NavBarList = ({items}) => {
    const { toggleSearch } = useSearch(); 

    const getItem = (item) => {
        let itemList = null;
        switch(item.type) {
            case 'logo':
                itemList = (
                    <Link to="/">
                        <img src={item.src} className="h-5 min-w-[154px]" alt={item.name}/>
                    </Link>
                );
                break;
            case 'language':
                itemList = <p className="border-white border-solid rounded-[3px] py-[3px] px-[5px] border-[1px] hover:bg-white hover:text-tmdbDarkBlue">{item.name}</p>
                break;
            case 'icon':
                if (item.name === 'search') {
                    itemList = (
                        <button onClick={toggleSearch} className="focus:outline-none">
                            <FontAwesomeIcon name={item.name} size='lg'/>
                        </button>
                    );
                } else {
                    itemList = (
                        <Link to={item.path}>
                            <FontAwesomeIcon name={item.name} size='lg'/>
                        </Link>
                    );
                }
                break;
            case 'link': 
                itemList = (
                    <Link to={item.path} className="hover:text-gray-300 transition-colors">
                        {item.name}
                    </Link>
                );
                break;
            default:
                itemList = <p>{item.name}</p>
                break;
        }
        return itemList;
    };

    return (
        <ul className="flex gap-7 items-center">
            {items.map(item => {
                return <li key={item.name}>{getItem(item)}</li>
            })}
        </ul>
    );
};

export default NavBarList;
