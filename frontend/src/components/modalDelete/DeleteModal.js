import { Button } from 'flowbite-react';
import React from 'react';

const DeleteModal = ({ folderName, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#F3F3F3] rounded-lg w-[400px]">
                <div className="p-5 rounded-t-lg">
                    <p className="pb-2 text-lg">Tem certeza de que deseja excluir a pasta "<strong>{folderName}</strong>"?</p>
                    <p className="text-sm">Quando excluído, o albúm não podera mais ser acessado ou editado por quem o publicou e aqueles que possuem o código de acesso.</p>
                </div>
                <hr/>
                <div className="flex justify-between m-3">
                    <Button onClick={onClose} className="bg-slate-800">Cancelar</Button>
                    <Button onClick={onConfirm} className="bg-rose-800 font-semibold text-white">Excluir mesmo assim</Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;