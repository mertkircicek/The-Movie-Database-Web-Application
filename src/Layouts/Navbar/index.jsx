import NavBarList from './navBarList';
import {navItemsLeft, navItemsRight } from "./navItems";
 
const NavBar = () => {
    return <nav className="h-20 bg-tmdbDarkBlue flex text-white font-semibold justify-between items-center max-w-[1800px] mx-auto px-10" >
        <NavBarList items = {navItemsLeft} />
        <NavBarList items = {navItemsRight} />
    </nav>
}

export default NavBar;