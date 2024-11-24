import React from 'react';
import '../../App.css';
import { Button } from "flowbite-react";
import FormsList from './formsList';

const ModalProfile = React.memo(({closeModal}) => {
    return (
        <div className="modal-show fixed inset-0 z-100 flex justify-center items-center h-screen w-screen bg-black bg-opacity-50" style={{zIndex: 1000}}>
            <div className="modal-profile rounded-xl bg-[#F3F3F3] w-[450px] h-auto m-5 p-4">
                <div className="modal-header flex items-center justify-between mb-3 px-1">
                    <p className="font-semibold text-lg">Alterar configurações de perfil</p>
                    <span className="material-symbols-outlined cursor-pointer" onClick={closeModal}>close</span>
                </div>
                <div className="modal-content flex flex-col">
                    <FormsList/>
                    <hr className="mt-2"/>
                    <div className="flex justify-center items-center mt-3">
                        <Button className="close-modal-btn bg-[#353438]"><b>Salvar</b></Button>   
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ModalProfile;