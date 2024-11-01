import '../../App.css';
import React, { useState } from "react";

const CodeInput = () => {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  return (
    <div>
        {code.map((num, index) => (
            <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={num}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="inputText w-16 h-16 border border-gray-300 rounded-2xl text-center text-3xl focus:outline-none focus:ring-2 focus:ring-gray-500 mt-5 mb-6 mx-1"
            />
        ))}
        <button className="bg-zinc-950 hover:bg-zinc-800 text-2xl text-white px-32 py-3 rounded-full"> CONTINUAR </button>
    </div>    
  );
};

export default CodeInput;