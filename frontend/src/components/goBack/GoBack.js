import React from 'react';
import '../../App.css';

const GoBack = React.memo(() => {

    return (
        <div className="go-back-button flex">
            <span className="material-symbols-outlined text-[#1C1B1F] text-[30px] cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">arrow_back</span>
        </div>
    );
});

export default GoBack;