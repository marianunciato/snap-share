import React, { useState } from 'react';
import '../../App.css';
import PhotoFolder from '../../components/photoFolder/PhotoFolder';
import Header from '../../components/header/Header';
import DeleteModal from '../../components/modalDelete/DeleteModal';

const MainPage = React.memo(() => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);

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
    };

    return (
        <div className="flex flex-col bg-slate-50 item h-screen w-full item">
            <Header text="Meus ensaios" showGoBack={false} showPageTitle={true}/>
            <div className="flex items-center justify-center">
                <div className="flex bg-[#F3F3F3] justify-center items-center mt-16 px-5 py-7 w-[1250px] gap-3 h-auto flex-wrap rounded-xl">
                    <PhotoFolder openDeleteModal={openDeleteModal} text="Fotos de Aniversário de 15 anos da Alana - 12/07/2024"/>
                    <PhotoFolder openDeleteModal={openDeleteModal} text="Fotos do Casamento do João e Cecília - 07/09/2024"/>
                    <PhotoFolder openDeleteModal={openDeleteModal} text="Confraternização da Empresa XYZ - 04/12/2024"/>
                    <PhotoFolder openDeleteModal={openDeleteModal} text="Fail better with David Duchovny - 04/12/2024"/>
                </div>
            </div>
            
            {isDeleteModalOpen && (
                <DeleteModal 
                    folderName={selectedFolder} 
                    onClose={closeDeleteModal} 
                    onConfirm={handleDeleteFolder} 
                />
            )}
        </div>
    );
});

export default MainPage;