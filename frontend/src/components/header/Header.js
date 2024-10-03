import React, {useState} from 'react';
import '../../App.css';
import { Tooltip } from "flowbite-react";
import LogoSnap from '../../assets/logo-minimal-light.png'
import ModalProfile from '../modalProfile/ModalProfile';

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            
            <header className="bg-[#E4E1DA] flex h-20 w-screen items-center justify-between">
                <img className="mx-20 h-14" src={LogoSnap} alt="Logo Snap Grande"/>
                <div className="flex gap-10 mx-20">
                    <div className="my-photoshoots">
                        <Tooltip content="Meus ensaios">
                            <span class="material-symbols-outlined cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">
                                folder_copy
                            </span>
                        </Tooltip>
                    </div>
                    <div className="my-profile" onClick={openModal}>
                        <Tooltip content="Minha conta">
                            <span class="material-symbols-outlined cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">
                                account_circle
                            </span>
                        </Tooltip>
                    </div>
                    <div className="logout">
                        <Tooltip content="Sair">
                            <span class="material-symbols-outlined cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">
                                logout
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;