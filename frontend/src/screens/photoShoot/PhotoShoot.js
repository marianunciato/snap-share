import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import "../../App.css";

const PhotoShoot = () => {
  const { photoShootId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noContent, setNoContent] = useState(false);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [maxSelectable, setmaxSelectable] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);
  const navigate = useNavigate();

  const photographer = JSON.parse(sessionStorage.getItem("data-ph"));
  const hashClient = JSON.parse(sessionStorage.getItem("hash-cl"));

  // Controlar se a validação já foi feita
  const [accessValidated, setAccessValidated] = useState(false);

  useEffect(() => {
    const validateAccess = async () => {
      if (accessValidated) return; // Evitar requisições repetidas

      try {
        const albumResponse = await axios.get(
          `https://snap-share.glitch.me/albums/${photoShootId}`
        );
        const albumData = albumResponse.data;
        setmaxSelectable(
          Number(albumData.download_limit) - Number(albumData.download_count)
        );
        // Verificando se o fotógrafo está logado e se ele é o dono do álbum
        if (photographer && photographer.id != albumData.photographer_id) {
          navigate(`/mainpage/${photographer.id}`);
          return;
        }

        // Se o hashClient estiver presente, validamos o acesso
        if (hashClient && hashClient != albumData.access_hash) {
          navigate(`/accesscode/${photoShootId}`);
          return;
        }

        // Caso contrário, configura as informações do álbum
        setAlbumInfo(albumData);
        setAccessValidated(true); // Marcar como validado
      } catch (error) {
        console.error("Erro ao validar acesso:", error);
        navigate(`/mainpage/${photographer?.id || ""}`);
      }
    };

    validateAccess();
  }, [photoShootId, navigate, photographer, hashClient, accessValidated]); // Garantir que a validação só ocorra uma vez

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const photosResponse = await axios.get(
          `https://snap-share.glitch.me/photos/${photoShootId}/photos`
        );
        setPhotos(photosResponse.data);
        setNoContent(photosResponse.data.length === 0);
      } catch (error) {
        if (error.response?.status === 404) setNoContent(true);
      } finally {
        setLoading(false);
      }
    };

    if (albumInfo) {
      // Só carregar as fotos depois que o álbum for validado
      fetchPhotos();
    }
  }, [photoShootId, albumInfo]); // Carregar as fotos somente após a validação do álbum

  const toggleMaxSelectPhoto = (photoId) => {
    if (hashClient) {
      if (
        selectedPhotos.length >= maxSelectable &&
        !selectedPhotos.includes(photoId)
      ) {
        alert(`Você só pode selecionar até ${maxSelectable} fotos.`);
        return;
      }

      setSelectedPhotos((prev) =>
        prev.includes(photoId)
          ? prev.filter((id) => id !== photoId)
          : [...prev, photoId]
      );
    } else {
      setSelectedPhotos((prev) =>
        prev.includes(photoId)
          ? prev.filter((id) => id !== photoId)
          : [...prev, photoId]
      );
    }
  };

  const deleteSelectedPhotos = async () => {
    if (selectedPhotos.length === 0) return;

    try {
      await Promise.all(
        selectedPhotos.map((photoId) =>
          axios.delete(`https://snap-share.glitch.me/photos/${photoId}`)
        )
      );

      alert("Fotos excluídas com sucesso!");
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => !selectedPhotos.includes(photo.id))
      );
      setSelectedPhotos([]);
    } catch (error) {
      console.error("Erro ao excluir fotos:", error);
    }
  };

  const downloadSelectedPhotos = async () => {
    hashClient &&
      (await axios.put(`https://snap-share.glitch.me/albums/${albumInfo.id}`, {
        ...albumInfo,
        download_count: albumInfo.download_count + selectedPhotos.length,
      }));
    selectedPhotos.forEach((photoId) => {
      const photo = photos.find((p) => p.id === photoId);
      if (photo) {
        const link = document.createElement("a");
        link.href = `data:image/jpeg;base64,${photo.url}`;
        link.download = `${photo.title || "photo"}.jpg`;
        link.click();
      }
    });

    hashClient &&
      setmaxSelectable(
        Number(albumInfo.download_limit) -
          (Number(albumInfo.download_count) + selectedPhotos.length)
      );
  };

  const handleAddPhotos = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      alert("Nenhum arquivo selecionado!");
      return;
    }

    try {
      const newPhotos = [];
      for (const file of files) {
        const base64 = await convertToBase64(file);

        const response = await axios.post(`https://snap-share.glitch.me/photos`, {
          url: base64,
          album_id: Number(photoShootId),
        });

        if (response.data && response.data.id) {
          newPhotos.push({
            id: response.data.id,
            url: base64,
          });
        }
      }

      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      alert("Fotos adicionadas com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar fotos:", error);
      alert("Erro ao adicionar fotos. Tente novamente.");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const openFullScreen = (index) => {
    setCurrentPhotoIndex(index);
  };

  const closeFullScreen = () => {
    setCurrentPhotoIndex(null);
  };

  const navigatePhoto = (direction, event) => {
    event.stopPropagation();
    if (direction === "next") {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "prev") {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading || noContent) {
    return (
      <div className="w-full">
        <Header
          className="w-screen"
          text={noContent ? "Ensaio sem fotos" : "Carregando fotos..."}
          showGoBack={true}
          showPageTitle={true}
        />
      </div>
    );
  }

  return (
    <div className="photo-gallery w-full">
      <Header
        text={
          photographer ? `Ensaios > ${albumInfo?.name}` : `${albumInfo?.name}`
        }
        showGoBack={true}
        showPageTitle={true}
      />

      <div className="gallery-header">
        <div>
          {hashClient && (
            <div>
              <span className="mx-2">
                Selecionados: {selectedPhotos.length}
              </span>
              <span className="mx-2">
                Downloads disponíveis: {maxSelectable}
              </span>
            </div>
          )}
        </div>
        <div>
          {selectedPhotos.length > 0 && (
            <>
              <button
                onClick={downloadSelectedPhotos}
                className="mx-2 font-bold text-blue-950 bg-white p-2 rounded-lg border-slate-800 hover:bg-blue-950 hover:text-white"
              >
                Baixar Selecionadas
              </button>
              {photographer && (
                <button
                  onClick={deleteSelectedPhotos}
                  className="text-red-700 mx-2 bg-white p-2 rounded-lg font-semibold border-slate-800 hover:bg-red-700 hover:text-white"
                >
                  Excluir Selecionadas
                </button>
              )}
            </>
          )}
          {photographer && (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAddPhotos}
              style={{ display: "none" }}
              id="upload-input"
            />
          )}
          {photographer && (
            <label
              htmlFor="upload-input"
              className="upload-button font-semibold cursor-pointer text-green-700 mx-2 bg-white p-3 rounded-lg border-slate-800 hover:bg-green-700 hover:text-white"
            >
              Adicionar Imagens
            </label>
          )}
        </div>
      </div>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={photo.id} className="photo-card">
            <img
              src={`data:image/jpeg;base64,${photo.url}`}
              alt={photo?.title}
              className="photo"
              onClick={() => openFullScreen(index)}
            />
            <input
              type="checkbox"
              checked={selectedPhotos.includes(photo.id)}
              onChange={() => toggleMaxSelectPhoto(photo.id)}
              disabled={
                hashClient &&
                selectedPhotos.length >= maxSelectable &&
                !selectedPhotos.includes(photo.id)
              }
            />
          </div>
        ))}
      </div>

      {currentPhotoIndex !== null && (
        <div className="full-screen-modal" onClick={closeFullScreen}>
          <div
            className="full-screen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="navigation">
              <button className="mr-[60px] h-12 w-12 rounded-full flex justify-center items-center" onClick={(e) => navigatePhoto("prev", e)}>
                <span class="material-symbols-outlined">
                  chevron_left
                </span>
              </button>
              <button className="ml-[60px] h-12 w-12 rounded-full flex justify-center items-center" onClick={(e) => navigatePhoto("next", e)}>
                <span class="material-symbols-outlined">
                  chevron_right
                </span>
              </button>
            </div>
            <div className="full-screen-controls">
              <label className="flex items-center p-2 text-white justify-end">
                <input
                  type="checkbox"
                  checked={selectedPhotos.includes(
                    photos[currentPhotoIndex].id
                  )}
                  onChange={() =>
                    toggleMaxSelectPhoto(photos[currentPhotoIndex].id)
                  }
                  disabled={
                    hashClient &&
                    selectedPhotos.length >= maxSelectable &&
                    !selectedPhotos.includes(photos[currentPhotoIndex].id)
                  }
                  className="mr-2"
                />
                Selecionar Foto
              </label>
              <img
                src={`data:image/jpeg;base64,${photos[currentPhotoIndex].url}`}
                alt={photos[currentPhotoIndex]?.title}
                className="full-screen-image"
              />
            </div>
          </div>
          <span className="close-button" onClick={closeFullScreen}>
            ×
          </span>
        </div>
      )}
    </div>
  );
};

export default PhotoShoot;
