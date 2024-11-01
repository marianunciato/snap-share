import React from 'react';
import '../../App.css';
import { TextInput } from "flowbite-react";

const InputDefault = React.memo(({text, icon, placeholder}) => {

    return (
        <div className="input-nome-empresa my-2">
            <div className='flex flex-row gap-2 pb-1 pl-2'>
                {icon}
                <p className="titulo-input font-medium">{text}</p>
            </div>
            <TextInput placeholder={placeholder} id="base" type="text" sizing="md" />
        </div>
    );
});

export default InputDefault;