const NavBarList = ({items}) => {
    return <ul>
        {items.map(item=> {
            return <li>{item.name}</li>
        })}
    </ul>
}

export default NavBarList;