import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import para acessar os parâmetros da rota
import "../../App.css";
import PhotoFolder from "../../components/photoFolder/PhotoFolder";
import Header from "../../components/header/Header";
import axios from "axios"; // Biblioteca para fazer chamadas HTTP
import EditOrDeletePhotoShootModal from "../../components/EditOrDeletePhotoShootModal/EditOrDeletePhotoShootModal"; // Modal de edição/exclusão

const PhotoShootsFromFoldernPage = React.memo(() => {
  const [photoShoot, setPhotoShoot] = useState([]); // Dados dos ensaios
  const [folder, setFolder] = useState(""); // Dados da pasta
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar a exibição da modal
  const [selectedPhotoShoot, setSelectedPhotoShoot] = useState(null); // Para armazenar o ensaio selecionado
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const { folderId } = useParams(); // Obtendo o ID do fotógrafo pela rota
  const navigate = useNavigate(); // Hook para navegação
  const photographer = JSON.parse(sessionStorage.getItem("data-ph"));

  // Função para buscar dados da API
  useEffect(() => {
    !photographer && navigate(`/`);
    const fetchPhotoShoot = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        const response = await axios.get(
          `http://localhost:3001/folders/${folderId}/albums`
        );
        setPhotoShoot(response.data);

        const folderResponse = await axios.get(
          `http://localhost:3001/folders/${folderId}`
        );
        setFolder(folderResponse.data);
      } catch (error) {
        console.error("Erro ao buscar ensaios:", error);
        const folderResponse = await axios.get(
          `http://localhost:3001/folders/${folderId}`
        );
        setFolder(folderResponse.data);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    if (folderId) fetchPhotoShoot();
  }, [folderId]);

  // Função para abrir a modal de nova pasta
  const redirectToNewPhotoShoot = () => {
    navigate(`/addphotoshoot/${folderId}`);
  };

  // Função para criar uma nova pasta
  const redirectToPhotoShoot = async (photoShoot) => {
    navigate(`/photoshoot/${photoShoot.id}`);
  };

  // Função para abrir a modal de edição/exclusão
  const openEditModal = (photoShoot) => {
    setSelectedPhotoShoot(photoShoot);
    setIsModalOpen(true);
  };

  // Função para salvar a edição do ensaio
  const handleSavePhotoShoot = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3001/albums/${selectedPhotoShoot.id}`, {
        ...updatedData,
        folder_id: folderId,
      });
      setPhotoShoot((prev) =>
        prev.map((photo) =>
          photo.id === selectedPhotoShoot.id
            ? { ...photo, ...updatedData }
            : photo
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar ensaio:", error);
    }
  };

  // Função para excluir o ensaio
  const handleDeletePhotoShoot = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/albums/${id}`);
      setPhotoShoot((prev) => prev.filter((photo) => photo.id !== id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir ensaio:", error);
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 item h-screen w-full item">
      <Header
        text={`${folder ? folder?.name : "..."} > Ensaios`}
        showGoBack={true}
        showPageTitle={true}
      />
      <div className="flex items-center justify-center">
        <div className="flex bg-[#F3F3F3] justify-center items-center mt-16 px-5 py-7 w-[1250px] gap-3 h-auto flex-wrap rounded-xl">
          <div onClick={redirectToNewPhotoShoot}>
            <PhotoFolder
              text={"Novo ensaio"}
              isNewItem={true}
              isClient={false}
            />
          </div>

          {/* Verifica se está carregando ou se tem ensaios */}
          {loading ? (
            <p>Carregando ensaios...</p> // Exibe enquanto estiver carregando
          ) : photoShoot.length > 0 ? (
            photoShoot.map((photoShoot) => (
              <div key={photoShoot.id} className="relative">
                <div onClick={() => redirectToPhotoShoot(photoShoot)}>
                  <PhotoFolder
                    text={photoShoot.name}
                    isNewItem={false}
                    isClient={false}
                  />
                </div>
                <button
                  className="absolute bottom-2 right-2 text-gray-600 hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita o clique na pasta ao abrir o menu
                    openEditModal(photoShoot);
                  }}
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            ))
          ) : (
            <p>Não há ensaios disponíveis.</p> // Caso não haja ensaios
          )}
        </div>
      </div>

      {/* Modal de edição/exclusão */}
      {isModalOpen && selectedPhotoShoot && (
        <EditOrDeletePhotoShootModal
          photoShoot={selectedPhotoShoot}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePhotoShoot}
          onDelete={handleDeletePhotoShoot}
        />
      )}
    </div>
  );
});

export default PhotoShootsFromFoldernPage;
