import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import PhotoFolder from "../../components/photoFolder/PhotoFolder";
import Header from "../../components/header/Header";
import DeleteModal from "../../components/modalDelete/DeleteModal";
import CreateFolderModal from "../../components/modalCreateFolder/modalCreateFolder";
import OptionsModal from "../../components/optionsModal/OptionsModal";
import axios from "axios";

const MainPage = React.memo(() => {
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para pesquisa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  const { photographerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificação de sessionStorage
    const sessionData = JSON.parse(sessionStorage.getItem("data-ph"));
    if (!sessionData || sessionData.id != photographerId) {
      navigate("/"); // Redireciona se não for autorizado
    }
  }, [photographerId, navigate]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/folders/${photographerId}/folders`
        );
        setFolders(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    if (photographerId) fetchFolders();
  }, [photographerId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Atualiza o valor de pesquisa
  };

  const filteredFolders = folders.filter(
    (folder) => folder.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pastas pelo nome
  );

  const handleCreateNewFolder = async (folderName) => {
    try {
      await axios.post(`http://localhost:3001/folders`, {
        name: folderName,
        photographer_id: photographerId,
      });
      const response = await axios.get(
        `http://localhost:3001/folders/${photographerId}/folders`
      );
      setFolders(response.data); // Atualiza as clientes com a nova lista
      setIsNewFolderModalOpen(false); // Fecha o modal após a criação
    } catch (error) {
      console.error("Erro ao criar novo cliente:", error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFolder(null);
  };

  const handleDeleteFolder = async () => {
    if (!editingFolder) {
      console.error("Nenhuma cliente selecionada para exclusão");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3001/folders/${editingFolder.id}`
      );
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== editingFolder.id)
      );
      closeEditModal();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  const openEditModal = (folder) => {
    setEditingFolder(folder);
    setIsOptionsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsOptionsModalOpen(false);
    setEditingFolder(null);
  };

  const handleEditFolder = async (folderName) => {
    try {
      const payload = {
        name: folderName,
        photographer_id: photographerId, // Inclui o ID do fotógrafo no payload
      };

      await axios.put(
        `http://localhost:3001/folders/${editingFolder.id}`,
        payload
      );

      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === editingFolder.id
            ? { ...folder, name: folderName }
            : folder
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
    }
  };

  const handleOpenFolder = (folderId) => {
    navigate(`/folder/${folderId}`);
  };

  return (
    <div className="flex flex-col bg-slate-50 item h-screen w-full item">
      <Header text="Clientes" showGoBack={false} showPageTitle={true} />

      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg max-w-[1250px] w-full my-4 mx-auto">
        <input
          type="text"
          placeholder="Pesquisar por nome do cliente"
          value={searchTerm}
          onChange={handleSearchChange} // Atualiza a pesquisa ao digitar
          className="px-4 rounded-md border border-gray-300 flex-grow"
        />
      </div>

      <div className="flex items-center justify-center ">
        <div className="flex bg-[#F3F3F3] justify-center items-center px-5 py-7 w-[1250px] gap-3 h-auto flex-wrap rounded-xl">
          <div onClick={() => setIsNewFolderModalOpen(true)}>
            <PhotoFolder
              text={"Novo cliente"}
              isNewItem={true}
              isClient={false}
            />
          </div>

          {filteredFolders.length > 0 ? (
            filteredFolders.map((folder) => (
              <div
                key={folder.id}
                className="relative"
                onClick={() => handleOpenFolder(folder.id)} // Permite clicar na cliente para navegar
              >
                <PhotoFolder
                  text={folder.name}
                  isNewItem={false}
                  isClient={true}
                  className="cursor-pointer"
                />
                <button
                  className="absolute bottom-2 right-2 text-gray-600 hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita o clique na cliente ao abrir o menu
                    openEditModal(folder);
                  }}
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            ))
          ) : (
            <p>Carregando clientes...</p>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          folderName={selectedFolder?.name}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteFolder}
        />
      )}

      {isNewFolderModalOpen && (
        <CreateFolderModal
          onClose={() => setIsNewFolderModalOpen(false)}
          onCreate={(name) => handleCreateNewFolder(name)}
        />
      )}

      {isOptionsModalOpen && (
        <OptionsModal
          folder={editingFolder}
          onClose={closeEditModal}
          onSave={handleEditFolder}
          onDelete={handleDeleteFolder} // Passa a função de exclusão para o modal
        />
      )}
    </div>
  );
});

export default MainPage;
