import '../access/Access.css';
import LogoSnapGrande from '../../assets/logo-light.png'
import { Select, Checkbox, Label, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import InputEmail from '../../components/input/InputEmail';
import InputPassword from '../../components/input/InputPassword';

const AccessLogin = React.memo(() => {

    const [role, setRole] = useState("Fotógrafo");
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        if (selectedRole === "Cliente") {
            navigate("/accessclient");
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center">
            <div className="flex flex-col w-[500px] h-[560px] bg-[#F3F3F3] rounded-b-3xl">
                <img className="mx-24 mt-20" src={LogoSnapGrande} alt="Logo Snap Grande"/>
                <div className="p-10">
                    <Select id="privacidade" value={role} onChange={handleRoleChange} required>
                        <option>Fotógrafo</option>
                        <option>Cliente</option>
                    </Select>
                    <InputEmail/> 
                    <InputPassword/>
                    <div className="flex justify-between">
                        <span className="flex gap-1.5 items-center">
                            <Checkbox id="remindme"/>
                            <Label className="text-black/75">Lembre-se de mim</Label>
                        </span>
                        <p className="text-sm font-semibold underline underline-offset-2 text-black/75 hover:text-black cursor-pointer">Esqueci minha senha</p>
                    </div>
                    <Button color="dark" size="lg" className='w-full mt-5'>ENTRAR</Button>
                    <div className="m-5 flex justify-center gap-1">
                        <p>É novo por aqui?</p>
                        <p className="cursor-pointer hover:font-medium underline underline-offset-2">Cadastre-se!</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AccessLogin;