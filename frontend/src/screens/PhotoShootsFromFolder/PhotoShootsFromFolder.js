import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import para acessar os parâmetros da rota
import "../../App.css";
import PhotoFolder from "../../components/photoFolder/PhotoFolder";
import Header from "../../components/header/Header";
import axios from "axios"; // Biblioteca para fazer chamadas HTTP

const PhotoShootsFromFoldernPage = React.memo(() => {
  const [photoShoot, setPhotoShoot] = useState([]);

  const { folderId } = useParams(); // Obtendo o ID do fotógrafo pela rota
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar dados da API
  useEffect(() => {
    const fetchPhotoShoot = async () => {
      try {
        const response = await axios.get(
          `https://snap-share.glitch.me/folders/${folderId}/albums`
        );
        setPhotoShoot(response.data);
      } catch (error) {
        console.error("Erro ao buscar ensaios:", error);
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
    try {
    } catch (error) {
      console.error("Erro ao criar ensaio:", error);
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 item h-screen w-full item">
      <Header text="Pastas > Ensaios" showGoBack={true} showPageTitle={true} />
      <div className="flex items-center justify-center">
        <div className="flex bg-[#F3F3F3] justify-center items-center mt-16 px-5 py-7 w-[1250px] gap-3 h-auto flex-wrap rounded-xl">
          <div onClick={redirectToNewPhotoShoot}>
            <PhotoFolder text={"Novo ensaio"} isNewItem={true} />
          </div>

          {/* Pastas da API */}
          {photoShoot.length > 0 ? (
            photoShoot.map((photoShoot) => (
              <div
                key={photoShoot.id}
                onClick={() => redirectToPhotoShoot(photoShoot)} // Redireciona para a página da pasta
              >
                <PhotoFolder
                  key={photoShoot.id}
                  isNewItem={false}
                  text={photoShoot.name}
                />
              </div>
            ))
          ) : (
            <p>Carregando ensaios...</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default PhotoShootsFromFoldernPage;
