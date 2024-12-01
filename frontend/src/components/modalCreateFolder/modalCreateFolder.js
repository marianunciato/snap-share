import React, { useState } from 'react';
import { Button } from 'flowbite-react'; // Para botões estilizados

const CreateFolderModal = ({ onClose, onCreate }) => {
    const [folderName, setFolderName] = useState(""); // Para armazenar o nome da nova pasta

    // Função chamada quando o usuário clica em "Salvar"
    const handleCreateClick = () => {
        if (folderName.trim() === "") {
            alert("Por favor, insira o nome da pasta!");
        } else {
            onCreate(folderName); // Passa o nome da pasta para o componente pai
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#F3F3F3] rounded-lg w-[400px]">
                <div className="p-5 rounded-t-lg">
                    <p className="pb-2 text-lg">Criar Nova Pasta</p>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="Nome da nova pasta"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <hr />
                <div className="flex justify-between m-3">
                    <Button onClick={onClose} className="bg-slate-800">Cancelar</Button>
                    <Button onClick={handleCreateClick} className="bg-blue-800 font-semibold text-white">Salvar</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateFolderModal;
