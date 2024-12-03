import React, { useState } from 'react';
import '../../App.css';
import { ToggleSwitch } from "flowbite-react";

const ToggleMarcaDagua = React.memo(({ text, icon, onValueChange }) => {
    const [switch1, setSwitch1] = useState(false);

    const handleChange = (value) => {
        setSwitch1(value);  // Atualiza o estado local
        onValueChange(value);  // Passa o valor para o pai via callback
    };

    return (
        <div className="input-nome-empresa my-2 flex flex-row gap-3 py-2 px-1">
            <ToggleSwitch
                color="gray"
                checked={switch1}
                onChange={handleChange}  // Chama o handler ao mudar o valor
            />
            <p className="titulo-input font-medium">{text}</p>
        </div>
    );
});

export default ToggleMarcaDagua;
