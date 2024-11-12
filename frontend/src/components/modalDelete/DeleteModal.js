// components/modals/DeleteModal.js
import { Button } from 'flowbite-react';
import React from 'react';

const DeleteModal = ({ folderName, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4">Excluir Pasta</h2>
                <p>Tem certeza de que deseja excluir a pasta "<strong>{folderName}</strong>"?</p>
                <p>Quando excluído, o albúm não podera mais ser acessado ou editado por quem o publicou e aqueles que possuem o código de acesso.</p>
                <div className="flex justify-end mt-4">
                    <Button onClick={onClose} className="bg-slate-800">Cancelar</Button>
                    <Button onClick={onConfirm} className="bg-rose-800 font-semibold text-white">Excluir mesmo assim</Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;