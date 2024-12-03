import React, { useState } from 'react';
import '../../App.css';
import { TextInput } from "flowbite-react";

const InputDefault = React.memo(({ text, icon, placeholder, onValueChange }) => {
    const [inputValue, setInputValue] = useState(''); // Estado local para o valor do input

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue); // Atualiza o estado local
        onValueChange(newValue);  // Passa o valor para o pai via callback
    };

    return (
        <div className="input-nome-empresa my-2">
            <div className='flex flex-row gap-2 pb-1 pl-2'>
                {icon}
                <p className="titulo-input font-medium">{text}</p>
            </div>
            <TextInput 
                placeholder={placeholder} 
                id="base" 
                type="text" 
                sizing="md" 
                value={inputValue}  // Controle o valor do input via estado local
                onChange={handleChange}  // Chama o handler ao mudar o valor
            />
        </div>
    );
});

export default InputDefault;
