import React from 'react';
import '../../App.css';

const NavButton = React.memo(({icon, onClick}) => {

    return (
        <div className="nav-button flex items-center cursor-pointer p-2 hover:bg-white hover:text-black hover:bg-opacity-60 rounded-full" onClick={onClick}>
                {icon}
        </div>
    );
});

export default NavButton;