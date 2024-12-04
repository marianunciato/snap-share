import React from "react";
import FolderImage from "../../assets/folder.png";
import FolderLabel from "../label/FolderLabel";
import plusIcon from "../../assets/plus-icon.png";
import "../../App.css";

const PhotoFolder = React.memo(
  ({ openDeleteModal, text, isNewItem = false, isClient = false, onEdit }) => {
    const handleDelete = () => {
      openDeleteModal(text);
    };

    return (
      <div className="hover:bg-[#dddddd] bg-[#EAEAEA] px-5 pb-2 pt-5 rounded-xl w-auto cursor-pointer">
        <div className="photo-folder flex justify-center items-center bg-[#F9F9F9] h-[203px] w-[340px] rounded-lg">
          {!isClient && (
            <img
              className="folder max-w-[150px]"
              src={isNewItem ? plusIcon : FolderImage}
              alt="Pasta de imagens"  
            />
          )}
          {isClient && (
            <span className="material-symbols-outlined text-9xl text-[#9f9f9f]">
              person
            </span>
          )}
        </div>
        <div className="flex justify-between w-[340px]">
          <FolderLabel text={text} onDelete={handleDelete} />
          
          {/* Botão de editar */}
          {!isNewItem && onEdit && (
            <button
              onClick={onEdit} // Chama a função de edição
              className="text-gray-600 hover:text-gray-800 p-2 rounded-md bg-transparent border-none cursor-pointer"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default PhotoFolder;
