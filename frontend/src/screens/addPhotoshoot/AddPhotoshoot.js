import '../../App.css';
import React from "react";
import Header from "../../components/header/Header.js";
import InputDefault from '../../components/input/Input.js';
import InputEmail from '../../components/input/Input.js';
import ToggleMarcaDagua from '../../components/toggle/ToggleMarcaDagua.js';
import { Button, Select } from 'flowbite-react';
import DropzoneDefault from '../../components/dropzone/Dropzone.js';
import LabelDefault from "../../components/label/Label.js"

const AddPhotoshoot = () => {

    return (
        <div className="flex flex-col bg-slate-50 h-screen w-full">
            <Header text="Adicionando novo ensaio"/>
            <div className="flex justify-center items-center">
                <div className="new-photoshoot flex flex-col mt-24 bg-[#F3F3F3] w-[1200px] p-5 rounded-xl">
                    <div className="flex flex-col">
                        <div className="step-one">
                            <InputDefault icon={<span className='material-symbols-outlined'>photo_camera_back</span>} text="Título do ensaio"/>    
                        </div>
                        <div className="mt-2 step-two flex flex-row gap-3">
                            <DropzoneDefault/>
                            <div className="step-two-watermark flex flex-col w-1/2 justify-end">
                                <LabelDefault text="Posição da marca d'água" icon={<span></span>}/>
                                <Select id="countries" required>
                                    <option>Canto inferior direito</option>
                                    <option>Canto inferior esquerdo</option>
                                    <option>Canto superior direito</option>
                                    <option>Canto superior esquerdo</option>
                                </Select>
                                <ToggleMarcaDagua text="Adicionar marca d’água automáticamente"/>
                            </div>
                        </div>
                        <div className="mt-2 step-three flex flex-row gap-3">
                            <div className="w-1/2">
                                <InputDefault icon={<span className='material-symbols-outlined'>person</span>} text="Nome do cliente"/>
                            </div>
                            <div className="w-1/2">
                                <InputEmail icon={<span className='material-symbols-outlined'>mail</span>} text="Email de contato do cliente"/>
                            </div>
                        </div>
                        <div className="mt-2 step-four flex flex-row gap-3">
                            <div className="w-1/3">
                                <LabelDefault text="Posição da marca d'água" icon={<span></span>}/>
                                <Select id="countries" required>
                                    <option>Canto inferior direito</option>
                                    <option>Canto inferior esquerdo</option>
                                    <option>Canto superior direito</option>
                                    <option>Canto superior esquerdo</option>
                                </Select>
                            </div>
                            <div className="w-1/3">
                                <LabelDefault text="Posição da marca d'água" icon={<span></span>}/>
                                <Select id="countries" required>
                                    <option>Canto inferior direito</option>
                                    <option>Canto inferior esquerdo</option>
                                    <option>Canto superior direito</option>
                                    <option>Canto superior esquerdo</option>
                                </Select>
                            </div>
                            <div className="w-1/3">
                                <LabelDefault text="Posição da marca d'água" icon={<span></span>}/>
                                <Select id="countries" required>
                                    <option>Canto inferior direito</option>
                                    <option>Canto inferior esquerdo</option>
                                    <option>Canto superior direito</option>
                                    <option>Canto superior esquerdo</option>
                                </Select>
                            </div>
                        </div>
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