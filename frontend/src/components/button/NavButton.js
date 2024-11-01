import React from 'react';
import '../../App.css';

const NavButton = React.memo(({icon}) => {

    return (
        <div class="nav-button flex cursor-pointer p-2 hover:bg-white hover:text-black hover:bg-opacity-60 rounded-full">
                {icon}
        </div>
    );
});

export default NavButton;