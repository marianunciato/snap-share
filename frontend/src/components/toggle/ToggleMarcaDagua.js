import React, {useState} from 'react';
import '../../App.css';
import { ToggleSwitch } from "flowbite-react";

const ToggleMarcaDagua = React.memo(({text, icon}) => {

    const [switch1, setSwitch1] = useState(false);

    return (
        <div className="input-nome-empresa my-2 flex flex-row gap-3 py-2 px-1">
            <ToggleSwitch color="gray" checked={switch1} onChange={setSwitch1} />
            <p className="titulo-input font-medium">{text}</p>
        </div>
    );
});

export default ToggleMarcaDagua;