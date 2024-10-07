import React from 'react';
import '../../App.css';

const LabelDefault = React.memo(({text, icon}) => {

    return (
        <div className='flex flex-row gap-2 pb-1 pl-2'>
            {icon}
            <p className="titulo-input font-medium">{text}</p>
        </div>
    );
});

export default LabelDefault;