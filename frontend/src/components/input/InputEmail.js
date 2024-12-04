import React from 'react';
import '../../App.css';
import { TextInput } from "flowbite-react";

const InputEmail = React.memo(({ text, icon, value, onValueChange }) => {
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
                id="email1"
                type="email"
                placeholder="seuemail@dominio.com"
                value={value} // Controlado pela prop 'value'
                onChange={handleChange} // Chama o handler ao mudar o valor
                required
            />
        </div>
    );
});

export default InputEmail;
