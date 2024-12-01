import React, { useState } from "react";

const InputFile = React.memo(({ text, icon }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="input-logo my-2">
            <div className="flex flex-row gap-2 pb-1 pl-2">
                {icon}
                <p className="titulo-input font-medium">{text}</p>
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
                <div className="border rounded-md p-2 text-center">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Logo Preview"
                            className="w-24 h-24 object-cover mx-auto"
                        />
                    ) : (
                        <p className="text-gray-500">Selecione uma imagem</p>
                    )}
                </div>
            </label>
        </div>
    );
});

export default InputFile;
