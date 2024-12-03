import React, { useState, useRef } from "react";
import Header from "../../components/header/Header.js";
import { useParams } from "react-router-dom";
import InputDefault from "../../components/input/Input.js";
import InputEmail from "../../components/input/Input.js";
import ToggleMarcaDagua from "../../components/toggle/ToggleMarcaDagua.js";
import { Button, Select } from "flowbite-react";
import LabelDefault from "../../components/label/Label.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPhotoshoot = React.memo(() => {
  const { folderId } = useParams();
  const logo = `data:image/jpeg;base64,${
    JSON.parse(sessionStorage.getItem("data-ph")).logo
  }`;
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [privacyLevel, setPrivacyLevel] = useState("email");
  const [downloadLimit, setDownloadLimit] = useState("");
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const clearImages = () => {
    setImages([]);
    setPreviewImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    // Validação do formulário
    if (
      !title ||
      !clientName ||
      !clientEmail ||
      !privacyLevel ||
      !downloadLimit ||
      images.length === 0
    ) {
      alert(
        "Por favor, preencha todos os campos obrigatórios e adicione pelo menos uma imagem."
      );
      return;
    }

    // 1. Criar o álbum através da rota /albums com axios
    const albumPayload = {
      download_count: 0,
      download_limit: downloadLimit, // Aqui você pode usar o valor do select ou input
      folder_id: folderId, // Pegando o folderId dos parâmetros da URL
      name: title, // Usando o título do ensaio
    };

    let albumId;

    try {
      const albumResponse = await axios.post(
        "https://snap-share.glitch.me/albums",
        albumPayload
      );

      // Obtém o id do álbum
      albumId = albumResponse.data.id;

      // 2. Enviar as imagens para /photos com axios
      const photoPromises = images.map(async (image) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result.split(",")[1]; // Obtém a parte base64 da imagem
          const photoPayload = {
            url: base64Image,
            album_id: albumId,
          };

          try {
            await axios.post(
              "https://snap-share.glitch.me/photos",
              photoPayload
            );
            console.log("Imagem enviada com sucesso!");
          } catch (error) {
            console.error("Erro ao enviar a foto:", error);
          }
        };
        reader.readAsDataURL(image); // Converte a imagem para base64
      });

      // Espera todas as imagens serem enviadas
      await Promise.all(photoPromises);

      console.log("Álbum criado e imagens enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      navigate(`/photoshoot/${albumId}`);
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 h-screen w-full overflow-hidden">
      <Header
        text="Adicionar novo ensaio"
        showGoBack={true}
        showPageTitle={true}
      />
      <div className="flex justify-center items-center flex-col my-4 flex-1 overflow-hidden">
        <div className="new-photoshoot flex flex-col bg-[#F3F3F3] w-7/12 p-5 rounded-xl flex-1">
          <div className="flex flex-col h-full overflow-auto">
            {/* Título */}
            <div className="step-one">
              <InputDefault
                placeholder="ex.: Festa de aniversário do Enzo"
                icon={
                  <span className="material-symbols-outlined">
                    photo_camera_back
                  </span>
                }
                text="Título do ensaio"
                onValueChange={(newValue) => setTitle(newValue)} // Passando a função de atualização
              />
            </div>
            {/* Seção de Upload e Configuração */}
            <div className="mt-4 flex flex-col">
              <div className="preview-section flex flex-col w-full mb-4">
                <LabelDefault
                  text="Adicione as fotos"
                  icon={
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>
                  }
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input mt-1 block w-full border border-gray-300 rounded-md cursor-pointer"
                />
                <div className="preview-grid">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
                {images.length > 0 && (
                  <button
                    onClick={clearImages}
                    className="text-red-500 text-sm mt-2 underline"
                  >
                    Limpar imagens
                  </button>
                )}
              </div>
              {/* Configuração de Marca d'Água */}
              <div className="watermark-settings flex flex-row justify-between items-center mt-2">
                <div className="toggle-section flex-1">
                  <ToggleMarcaDagua
                    text="Adicionar marca d’água automaticamente"
                    onValueChange={setIsWatermarkEnabled}
                  />
                </div>
                <div className="logo-preview flex-1 flex justify-center">
                  <div>
                    <LabelDefault text="Pré-visualização da marca d'água" />
                    <img
                      src={logo}
                      alt="Logo"
                      className="object-contain h-16 w-auto mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Outras configurações */}
            <div className="mt-2 step-three flex flex-row gap-3">
              <div className="w-1/2">
                <InputDefault
                  icon={
                    <span className="material-symbols-outlined">person</span>
                  }
                  text="Nome do cliente"
                  onValueChange={(newValue) => setClientName(newValue)}
                />
              </div>
              <div className="w-1/2">
                <InputEmail
                  icon={<span className="material-symbols-outlined">mail</span>}
                  text="Email de contato do cliente"
                  onValueChange={(newValue) => setClientEmail(newValue)}
                />
              </div>
            </div>
            <div className="mt-2 step-four flex flex-row gap-3 ">
              <div className="w-1/2 my-2">
                <LabelDefault
                  text="Nível de privacidade"
                  icon={
                    <span className="material-symbols-outlined">encrypted</span>
                  }
                />
                <Select
                  id="privacy-level"
                  required
                  value={privacyLevel}
                  onChange={(e) => setPrivacyLevel(e.target.value)}
                >
                  <option value={"email"}>Compartilhamento por email</option>
                  <option value={"portfolio"}>Disponível como portfólio</option>
                </Select>
              </div>
              <div className="w-1/2">
                <InputDefault
                  icon={
                    <span className="material-symbols-outlined">
                      folder_limited
                    </span>
                  }
                  text="Limite de download"
                  value={downloadLimit}
                  onValueChange={(newValue) => setDownloadLimit(newValue)}
                  placeholder="Ex: 15 fotos"
                />
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <div className="flex justify-end items-center mt-3">
            <p className="text-[16px] mx-7 hover:text-red-700 hover:underline hover:underline-offset-2 cursor-pointer">
              Limpar campos preenchidos
            </p>
            <Button
              className="close-modal-btn bg-[#353438]"
              onClick={handleSave}
            >
              <b>Salvar</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddPhotoshoot;
