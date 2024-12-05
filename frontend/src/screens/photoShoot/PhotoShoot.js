import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import "../../App.css";

const PhotoShoot = ({ maxSelectable }) => {
  const { photoShootId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noContent, setNoContent] = useState(false);
  const [albumInfo, setAlbumInfo] = useState(null);
  const navigate = useNavigate();

  const photographer = JSON.parse(sessionStorage.getItem("data-ph"));
  const hashClient = JSON.parse(sessionStorage.getItem("hash-cl"));

  useEffect(() => {
    const validateAccess = async () => {
      

      try {
        const albumResponse = await axios.get(
          `https://snap-share.glitch.me/albums/${photoShootId}`
        );
        const albumData = albumResponse.data;

        console.log(photographer?.id)
        console.log(albumData?.photographer_id)
        // Verifica se o fotógrafo tem permissão para acessar o álbum
        if (photographer && photographer.id != albumData.photographer_id) {
          navigate(`/mainpage/${photographer.id}`);
          return;
        }

        if (!photographer && hashClient && hashClient != albumData.access_hash) {
          navigate(`/accesscode/${photoShootId}`);
          return;
        }

        setAlbumInfo(albumData);
      } catch (error) {
        console.error("Erro ao validar acesso:", error);
        navigate(`/mainpage/${photographer?.id || ""}`);
      }
    };

    validateAccess();
  }, [photographer, hashClient, photoShootId, navigate]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const photosResponse = await axios.get(
          `https://snap-share.glitch.me/photos/${photoShootId}/photos`
        );
        setPhotos(photosResponse.data);
      } catch (error) {
        if (error.response?.status === 404) setNoContent(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [photoShootId]);

  const toggleSelectPhoto = (photoId) => {
    setSelectedPhotos((prev) => {
      if (prev.includes(photoId)) {
        return prev.filter((id) => id !== photoId);
      }
      if (prev.length < maxSelectable) {
        return [...prev, photoId];
      }
      return prev;
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

  const downloadSelectedPhotos = () => {
    selectedPhotos.forEach((photoId) => {
      const photo = photos.find((p) => p.id === photoId);
      if (photo) {
        const link = document.createElement("a");
        link.href = `data:image/jpeg;base64,${photo.url}`;
        link.download = `${photo.title || "photo"}.jpg`;
        link.click();
      }
    });
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
        <span>
          Selecionados: {selectedPhotos.length} / {maxSelectable}
        </span>
        {selectedPhotos.length > 0 && (
          <button onClick={downloadSelectedPhotos}>Baixar Selecionadas</button>
        )}
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
              onChange={() => toggleSelectPhoto(photo.id)}
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
              <button onClick={(e) => navigatePhoto("prev", e)}>Anterior</button>
              <button onClick={(e) => navigatePhoto("next", e)}>Próxima</button>
            </div>
            <div className="full-screen-controls">
              <label className="flex items-center p-2 text-white justify-end">
                <input
                  type="checkbox"
                  checked={selectedPhotos.includes(
                    photos[currentPhotoIndex].id
                  )}
                  onChange={() =>
                    toggleSelectPhoto(photos[currentPhotoIndex].id)
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
