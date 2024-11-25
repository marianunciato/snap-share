import '../access/Access.css';
import LogoSnapGrande from '../../assets/logo-light.png'
import { Select, Checkbox, Label, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import React, {useState, useRef} from "react";

const AccessClient = React.memo(() => {

    const [role, setRole] = useState("Cliente");
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        if (selectedRole === "Fotógrafo") {
            navigate("/accesslogin");
        }
    };

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && !e.target.value) {
          inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center">
            <div className="flex flex-col w-[500px] h-[480px] bg-[#F3F3F3] rounded-b-3xl">
                <img className="mx-24 mt-20" src={LogoSnapGrande} alt="Logo Snap Grande"/>
                <div className="p-10">
                    <Select id="privacidade" value={role} onChange={handleRoleChange} required>
                        <option>Fotógrafo</option>
                        <option>Cliente</option>
                    </Select>
                    <div className="flex justify-between space-x-2 my-5">
                        {Array(6)
                            .fill("")
                            .map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                maxLength="1"
                                className="w-16 h-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-3xl font-extrabold text-black/75"
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                            ))}
                    </div>
                    <Button color="dark" size="lg" className='w-full mt-5'>ENTRAR</Button>
                </div>
            </div>
        </div>
    );
});

export default AccessClient;