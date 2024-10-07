import React, {useState} from 'react';
import '../../App.css';
import { Tooltip } from "flowbite-react";
import LogoSnap from '../../assets/logo-minimal-light.png'
import ModalProfile from '../modalProfile/ModalProfile';
import NavButton from '../button/NavButton';

const Header = React.memo(({text}) => {
    return (
        <div>
            <header className="bg-[#E4E1DA] flex h-20 w-full items-center justify-between">
                <img className="mx-20 h-14" src={LogoSnap} alt="Logo Snap Grande"/>
                <p className="font-bold text-xl">{text}</p>
                <p className="text-[#E4E1DA]">SEGREDOOOOOOOOOOOOOOOOOOOOOOOO0000000000OOOOOOOOOOOOOOOOOOO</p>
                <div className="flex gap-10 mx-20">
                    <div className="my-photoshoots">
                        <Tooltip content="Meus ensaios">
                            <NavButton icon={<span className="material-symbols-outlined">folder_copy</span>}/>
                        </Tooltip>
                    </div>
                    <div className="my-profile">
                        <Tooltip content="Minha conta">
                            <NavButton icon={<span className="material-symbols-outlined">account_circle</span>}/>
                        </Tooltip>
                    </div>
                    <div className="logout">
                        <Tooltip content="Sair">
                            <NavButton icon={<span className="material-symbols-outlined">logout</span>}/>
                        </Tooltip>
                    </div>
                </div>
            </header>
        </div>
    );
});

export default Header;