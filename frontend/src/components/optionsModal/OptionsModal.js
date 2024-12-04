import React, { useState } from "react";
import { Button } from "flowbite-react"; // Para botões estilizados

const OptionsModal = ({ folder, onClose, onSave, onDelete }) => {
  const [folderName, setFolderName] = useState(folder.name); // Inicializa o nome da pasta com o nome atual

  // Função chamada quando o usuário clica em "Salvar"
  const handleSaveClick = () => {
    if (folderName.trim() === "") {
      alert("Por favor, insira o nome da pasta!");
    } else {
      onSave(folderName); // Passa o novo nome da pasta para o componente pai
    }
  };

  // Função chamada quando o usuário clica em "Excluir"
  const handleDeleteClick = () => {
    if (
      window.confirm(`Tem certeza que deseja excluir a pasta "${folder.name}"?`)
    ) {
      onDelete(folder.id); // Chama a função de exclusão com o id da pasta
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F3F3F3] rounded-lg w-[400px]">
        <div className="p-5 rounded-t-lg">
          <p className="pb-2 text-lg">Editar Pasta</p>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nome da pasta"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <hr />
        <div className="flex justify-between m-3 space-x-3">
          <Button onClick={onClose} className="bg-slate-800 w-full">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteClick} // Chama a função para excluir a pasta
            className="bg-red-600 font-semibold text-white w-full"
          >
            Excluir
          </Button>
          <Button
            onClick={handleSaveClick}
            className="bg-blue-800 font-semibold text-white w-full"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;