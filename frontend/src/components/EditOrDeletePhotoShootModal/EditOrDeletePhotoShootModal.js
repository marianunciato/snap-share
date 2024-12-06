import React, { useState } from "react";
import { Button } from "flowbite-react"; // Para botões estilizados
import InputDefault from "../input/Input"; // Caminho para o componente InputDefault

const EditOrDeletePhotoShootModal = ({ photoShoot, onClose, onSave, onDelete }) => {
  const [photoShootName, setPhotoShootName] = useState(photoShoot.name);
  const [accessHash, setAccessHash] = useState(photoShoot.access_hash);
  const [downloadCount, setDownloadCount] = useState(photoShoot.download_count);
  const [downloadLimit, setDownloadLimit] = useState(photoShoot.download_limit);

  // Função chamada quando o usuário clica em "Salvar"
  const handleSaveClick = () => {
    if (photoShootName.trim() === "") {
      alert("Por favor, insira o nome do ensaio!");
    } else {
      onSave({ name: photoShootName, access_hash: accessHash, download_count: downloadCount, download_limit: downloadLimit });
    }
  };

  // Função chamada quando o usuário clica em "Excluir"
  const handleDeleteClick = () => {
    if (window.confirm(`Tem certeza que deseja excluir o ensaio "${photoShoot.name}"?`)) {
      onDelete(photoShoot.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F3F3F3] rounded-lg w-[400px]">
        <div className="p-5 rounded-t-lg">
          <div className="flex justify-between items-center ">
            <p className="pb-2 text-lg">Editar ou Excluir Ensaio</p>
            <span 
              onClick={onClose}
              class="material-symbols-outlined cursor-pointer hover:bg-white/75 p-1 rounded-full"
            >
              close
            </span>
          </div>
          <InputDefault
            text="Nome do Ensaio"
            placeholder="Nome do ensaio"
            value={photoShootName}
            onValueChange={setPhotoShootName}
          />
          
          <InputDefault
            text="Hash de Acesso"
            placeholder="Hash de acesso"
            value={accessHash}
            onValueChange={setAccessHash}
            disabled={true}
          />

          <InputDefault
            text="Contagem de Downloads"
            placeholder="Contagem de downloads"
            value={downloadCount}
            onValueChange={(value) => setDownloadCount(Number(value))}
          />

          <InputDefault
            text="Limite de Downloads"
            placeholder="Limite de downloads"
            value={downloadLimit}
            onValueChange={(value) => setDownloadLimit(Number(value))}
          />
        </div>
        <hr />
        <div className="flex justify-between m-3 space-x-3">
          <Button
            onClick={handleDeleteClick}
            className="bg-red-700 w-32 font-semibold text-white"
          >
            Excluir
          </Button>
          <Button
            onClick={handleSaveClick}
            className="bg-green-700 w-32 font-semibold text-white"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditOrDeletePhotoShootModal;
