import React from 'react';
import '../../App.css';
import { Select } from "flowbite-react";

const SelectMarcaDagua = React.memo(({text, icon}) => {

    return (
        <div className="input-nome-empresa my-2">
            <div className='flex flex-row gap-2 pb-1 pl-2'>
                {icon}
                <p className="titulo-input font-medium">{text}</p>
            </div>
            <Select id="countries" required>
                <option>Canto inferior direito</option>
                <option>Canto inferior esquerdo</option>
                <option>Canto superior direito</option>
                <option>Canto superior esquerdo</option>
            </Select>
        </div>
    );
});

export default SelectMarcaDagua;