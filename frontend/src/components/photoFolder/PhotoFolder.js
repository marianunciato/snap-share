import React from "react";
import FolderImage from "../../assets/folder.png";
import FolderLabel from "../label/FolderLabel";
import plusIcon from "../../assets/plus-icon.png";
import "../../App.css";

const PhotoFolder = React.memo(
  ({ openDeleteModal, text, isNewItem = false }) => {
    const handleDelete = () => {
      openDeleteModal(text);
    };

    return (
      <div className="hover:bg-[#EAEAEA] px-5 pb-2 pt-5 rounded-xl w-auto cursor-pointer">
        <div className="photo-folder flex justify-center items-center bg-[#F9F9F9] h-[203px] w-[340px] rounded-lg">
          <img
            className="folder max-w-[150px]"
            src={isNewItem ? plusIcon : FolderImage}
            alt="Pasta de imagens"
          />
        </div>
        <div className="flex w-[340px]">
          <FolderLabel text={text} onDelete={handleDelete} />
        </div>
      </div>
    );
  }
);

export default PhotoFolder;
