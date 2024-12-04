import React from 'react';
import '../../App.css';
import FormsList from './formsList';

const ModalProfile = React.memo(({ closeModal, photographer }) => {
    return (
        <div
            className="modal-show fixed inset-0 z-50 flex justify-center items-center h-screen w-screen bg-black bg-opacity-50"
            style={{ zIndex: 1000 }}
        >
            <div className="modal-profile rounded-xl bg-[#F3F3F3] w-[500px] max-h-[90vh] m-5 p-4 overflow-y-auto">
                {/* Modal Header */}
                <div className="modal-header flex items-center justify-between mb-3 px-1">
                    <p className="font-semibold text-lg">Alterar configurações de perfil</p>
                    <span
                        className="material-symbols-outlined cursor-pointer"
                        onClick={closeModal}
                    >
                        close
                    </span>
                </div>

                {/* Modal Content */}
                <div className="modal-content flex flex-col">
                    <FormsList />
                </div>
            </div>
        </div>
    );
});

export default ModalProfile;
