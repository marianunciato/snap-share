import React from 'react';
import { Tooltip } from 'flowbite-react';
import TooltipFolder from '../button/TooltipFolder';
import NavButton from '../button/NavButton';
import '../../App.css';

const FolderLabel = React.memo(({ text, onDelete }) => {
    return (
        <div className='flex w-[340px] p-2'>
            <p className="titulo-input font-medium mr-5">{text}</p>
            <Tooltip placement="bottom" content={<TooltipFolder onDelete={onDelete}/>}>
                <NavButton icon={<span className="material-symbols-outlined">more_vert</span>}/>
            </Tooltip>
        </div>
    );
});

export default FolderLabel;