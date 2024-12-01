import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import para acessar os parâmetros da rota
import "../../App.css";
import PhotoFolder from "../../components/photoFolder/PhotoFolder";
import Header from "../../components/header/Header";
import DeleteModal from "../../components/modalDelete/DeleteModal";
import CreateFolderModal from "../../components/modalCreateFolder/modalCreateFolder";
import axios from "axios"; // Biblioteca para fazer chamadas HTTP

const MainPage = React.memo(() => {
  const [folders, setFolders] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false); // Para controlar a exibição da modal de nova pasta
  const [newFolderName, setNewFolderName] = useState(""); // Armazenar o nome da nova pasta

  const { photographerId } = useParams(); // Obtendo o ID do fotógrafo pela rota
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar dados da API
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `https://snap-share.glitch.me/folders/${photographerId}/folders`
        );
        setFolders(response.data);
      } catch (error) {
        console.error("Erro ao buscar pastas:", error);
      }
    };

    if (photographerId) fetchFolders();
  }, [photographerId]);

  const openDeleteModal = (folder) => {
    setSelectedFolder(folder);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFolder(null);
  };

  const handleDeleteFolder = () => {
    closeDeleteModal();
    console.log("Folder deleted:", selectedFolder);
    // Aqui você pode adicionar uma chamada para excluir a pasta na API
  };

  // Função para abrir a modal de nova pasta
  const openNewFolderModal = () => {
    setIsNewFolderModalOpen(true);
  };

  // Função para fechar a modal de nova pasta
  const closeNewFolderModal = () => {
    setIsNewFolderModalOpen(false);
    setNewFolderName(""); // Limpar o campo ao fechar a modal
  };

  // Função para criar uma nova pasta
  const handleCreateNewFolder = async (folderName) => {
    try {
      // Enviar a requisição para criar uma nova pasta
      await axios.post(`https://snap-share.glitch.me/folders`, {
        name: folderName,
        photographer_id: photographerId,
      });
      // Recarregar as pastas com a nova pasta criada
      const response = await axios.get(
        `https://snap-share.glitch.me/folders/${photographerId}/folders`
      );
      setFolders(response.data); // Atualiza as pastas com a resposta da API
      closeNewFolderModal(); // Fechar a modal após a criação
    } catch (error) {
      console.error("Erro ao criar pasta:", error);
    }
  };

  // Função para navegar até a página de visualização de uma pasta
  const handleOpenFolder = (folderId) => {
    navigate(`/folder/${folderId}`); // Rota para visualizar o conteúdo de uma pasta
  };

  return (
    <div className="flex flex-col bg-slate-50 item h-screen w-full item">
      <Header text="Minhas Pastas" showGoBack={false} showPageTitle={true} />
      <div className="flex items-center justify-center">
        <div className="flex bg-[#F3F3F3] justify-center items-center mt-16 px-5 py-7 w-[1250px] gap-3 h-auto flex-wrap rounded-xl">
          <div onClick={openNewFolderModal}>
            <PhotoFolder text={"Nova pasta"} isNewItem={true} />
          </div>

          {/* Pastas da API */}
          {folders.length > 0 ? (
            folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => handleOpenFolder(folder.id)} // Redireciona para a página da pasta
              >
                <PhotoFolder
                  key={folder.id}
                  openDeleteModal={() => openDeleteModal(folder.name)}
                  text={folder.name}
                  isNewItem={false}
                />
              </div>
            ))
          ) : (
            <p>Carregando pastas...</p>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          folderName={selectedFolder}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteFolder}
        />
      )}

      {/* Modal para Criar Nova Pasta */}
      {isNewFolderModalOpen && (
        <CreateFolderModal
          onClose={closeNewFolderModal}
          onCreate={handleCreateNewFolder}
        />
      )}
    </div>
  );
});

export default MainPage;
