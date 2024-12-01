import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import "../../App.css";

const PhotoShoot = ({ maxSelectable }) => {
  const { photoShootId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState(null); // Estado para armazenar as informações do álbum

  // Busca as fotos da API
  useEffect(() => {
    const fetchPhotosAndAlbumInfo = async () => {
      setLoading(true);
      try {
        // Buscar as fotos do ensaio
        const photosResponse = await axios.get(
          `https://snap-share.glitch.me/photos/${photoShootId}/photos`
        );
        setPhotos(photosResponse.data);

        // Buscar as informações do álbum
        const albumResponse = await axios.get(
          `https://snap-share.glitch.me/albums/${photoShootId}`
        );
        setAlbumInfo(albumResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotosAndAlbumInfo();
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

  if (loading) {
    return <div>Carregando fotos...</div>;
  }

  return (
    <div className="photo-gallery">
      <Header text={`Ensaios > ${albumInfo?.name}`} showGoBack={true} showPageTitle={true} />

      {/* Exibindo informações do álbum */}
      {albumInfo && (
        <div className="album-info">
          <h2>{albumInfo.title}</h2>
          <p>{albumInfo.description}</p>
          <p>Data: {new Date(albumInfo.date).toLocaleDateString()}</p>
        </div>
      )}

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
            <img
              src={`data:image/jpeg;base64,${photos[currentPhotoIndex].url}`}
              alt={photos[currentPhotoIndex]?.title}
              className="full-screen-image"
            />
          </div>
          <span className="close-button" onClick={closeFullScreen}>×</span>
        </div>
      )}
    </div>
  );
};

export default PhotoShoot;
