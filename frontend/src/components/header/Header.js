import '../../App.css';
import { Button, Tooltip } from "flowbite-react";
import LogoSnap from '../../assets/logo-snap2.png'

const Header = () => {
    return (
        <div>
            <header className="bg-[#E4E1DA] flex h-20 w-screen items-center justify-between">
                <img className="mx-20 size-14" src={LogoSnap} alt="Logo Snap Grande"/>
                <div className="flex gap-10 mx-20">
                    <Tooltip content="Menu">
                        <span class="material-symbols-outlined cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">
                            home
                        </span>
                    </Tooltip>
                    <Tooltip content="Sua conta">
                        <span class="material-symbols-outlined cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">
                            account_circle
                        </span>
                    </Tooltip>
                    <Tooltip content="Sair">
                        <span class="material-symbols-outlined cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full">
                            logout
                        </span>
                    </Tooltip>
                </div>
            </header>
        </div>
    );
}

export default Header;