import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const GoBack = React.memo(({ targetRoute }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (targetRoute) {
            navigate(targetRoute);
        } else {
            navigate(-1); // Volta para a rota anterior
        }
    };

    return (
        <div className="go-back-button flex">
            <span 
                className="material-symbols-outlined text-[#1C1B1F] text-[30px] cursor-pointer p-2 hover:bg-white hover:bg-opacity-60 rounded-full" 
                onClick={handleGoBack}
            >
                arrow_back
            </span>
        </div>
    );
});

export default GoBack;
