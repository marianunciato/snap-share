import React from 'react';
import { TextInput } from "flowbite-react";

const InputDefault = React.memo(({ text, icon, placeholder, value, onValueChange, disabled=false }) => {
    const handleChange = (e) => {
        const newValue = e.target.value;
        onValueChange(newValue); // Passa o valor para o pai via callback
    };

    return (
        <div className="input-nome-empresa my-2">
            <div className="flex flex-row gap-2 pb-1 pl-2">
                {icon}
                <p className="titulo-input font-medium">{text}</p>
            </div>
            <TextInput
                placeholder={placeholder}
                id="base"
                type="text"
                sizing="md"
                value={value} // Controlado pela prop 'value'
                onChange={handleChange} // Chama o handler ao mudar o valor
                disabled={disabled} // Passa a prop disabled
            />
        </div>
    );
});

export default InputDefault;
