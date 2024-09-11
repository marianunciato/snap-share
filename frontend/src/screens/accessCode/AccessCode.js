import '../../App.css';
import React from "react";
import LogoSnapGrande from "../../assets/logo-snap1.png"
import CodeInput from '../../components/codeInput/CodeInput';

const AccessCode = () => {
    return (
        <div className="flex bg-zinc-950 h-screen w-screen justify-center items-center">
            <div className="code-area flex flex-col justify-center items-center p-20 w-[600px] h-[500px] bg-[#E4E1DA] rounded-3xl">
                <img className="size-8/12" src={LogoSnapGrande} alt="Logo Snap Grande"/>
                <div className="textCode mt-3 w-[360px]">
                    <h2>
                        INFORME SEU CÓDIGO PARA ACESSAR SUAS FOTOS!
                    </h2>
                </div>
                <CodeInput/>
            </div>
        </div>
    );
}

export default AccessCode;