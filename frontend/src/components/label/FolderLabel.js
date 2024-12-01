import React from 'react';
import '../../App.css';

const FolderLabel = React.memo(({ text, onDelete }) => {
    return (
        <div className='flex w-[340px] p-2'>
            <p className="titulo-input font-medium mr-5">{text}</p>
        </div>
    );
});

export default FolderLabel;