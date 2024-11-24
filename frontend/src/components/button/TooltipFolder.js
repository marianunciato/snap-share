import React from 'react';
import '../../App.css';

const TooltipFolder = React.memo(({ onEdit, onDelete }) => {
    return (
        <div>
            <div className="flex justify-start items-center gap-3 hover:bg-white/20 p-2 m-1 rounded-md cursor-pointer" onClick={onEdit}>
                <span className="material-symbols-outlined">border_color</span>
                <label className="text-base">Editar</label>
            </div>
            <div className="flex justify-start items-center gap-3 hover:bg-white/20 p-2 m-1 rounded-md cursor-pointer text-red-500" onClick={onDelete}>
                <span className="material-symbols-outlined">delete</span>
                <label className="text-base">Excluir</label>
            </div>
        </div>
    );
});

export default TooltipFolder;