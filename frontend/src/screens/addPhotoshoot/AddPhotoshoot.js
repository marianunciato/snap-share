import '../../App.css';
import React from "react";
import Header from "../../components/header/Header.js";
import InputDefault from '../../components/input/Input.js';
import InputEmail from '../../components/input/Input.js';
import SelectMarcaDagua from '../../components/select/SelectMarcaDagua.js';
import ToggleMarcaDagua from '../../components/toggle/ToggleMarcaDagua.js';
import { Button } from 'flowbite-react';

const AddPhotoshoot = () => {

    return (
        <div className="bg-slate-50 h-screen w-screen">
            <Header/>
            <div className="flex justify-center items-center">
                <div className="new-photoshoot w-[1300px] h-auto mt-24 bg-[#F3F3F3] p-5 rounded-xl">
                    <InputDefault icon={<span className='material-symbols-outlined'>photo_camera_back</span>} text="Título do ensaio"/>
                    <div>
                        <SelectMarcaDagua icon={<span className='material-symbols-outlined'>branding_watermark</span>} text="Posição da marca d'água"/>
                        <ToggleMarcaDagua text="Adicionar marca d’água automáticamente"/>
                    </div>
                    <div>
                        <InputDefault icon={<span className='material-symbols-outlined'>person</span>} text="Nome do cliente"/>
                        <InputEmail icon={<span className='material-symbols-outlined'>mail</span>} text="Email de contato do cliente"/>
                    </div>
                    <div>
                        <SelectMarcaDagua icon={<span className='material-symbols-outlined'>encrypted</span>} text="Nível de privacidade"/>
                        <SelectMarcaDagua icon={<span className='material-symbols-outlined'>folder_limited</span>} text="Limite de download"/>
                        <SelectMarcaDagua icon={<span className='material-symbols-outlined'>date_range</span>} text="Tempo de disponibilidade das fotos"/>
                    </div>
                    <hr className="mt-2"/>
                    <div className="flex justify-end items-center mt-3">
                        <Button className="close-modal-btn bg-[#353438]"><b>Salvar</b></Button>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPhotoshoot;