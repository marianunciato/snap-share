import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoLight from "../../assets/logo-light.png";
import loginBackground from "../../assets/login-background.png";
import axios from "axios";

const Login = ({ isClient }) => {
  const { id } = useParams();
  const [isPhotographer, setIsPhotographer] = useState(!isClient);
  const [code, setCode] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Auto-focus para o próximo campo
      if (value && index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (isPhotographer) {
      console.log("Login do Fotógrafo:", { email, password });
      navigate(`/dashboard?role=photographer&id=${id}`);
    } else {
      const codeValue = code.join("");

      try {
        // Fazendo a requisição à API
        const response = await axios.get(
          `https://snap-share.glitch.me/albums/${id}`
        );
        console.log("Dados do cliente:", response.data);
        if (response.data.access_hash == codeValue) {
          navigate(`/client-albums?id=${id}&code=${codeValue}`);
        } else {
          alert(
            "Não foi possível acessar o álbum com o código informado. Verifique o código e tente novamente."
          );
          setCode(Array(6).fill(""));
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
      }
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-neutral-50 shadow-lg rounded-md p-8 w-full max-w-md text-center">
        <img
          src={logoLight}
          alt="Snap Share Logo"
          className="mx-auto mb-6 w-32"
        />

        <h2 className="text-xl font-semibold mb-4">LOGIN</h2>
        <div className="flex justify-center mb-6">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 text-sm"
            value={isPhotographer ? "Fotógrafo" : "Cliente"}
            onChange={(e) => setIsPhotographer(e.target.value === "Fotógrafo")}
          >
            <option value="Cliente">Cliente</option>
            <option value="Fotógrafo">Fotógrafo</option>
          </select>
        </div>
        {isPhotographer ? (
          // Campos para fotógrafo
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ) : (
          // Inputs para código do cliente
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Informe seu código:
              </p>
            </div>
            <div className="flex gap-2 justify-center mb-6">
              {code.map((num, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength="1"
                  value={num}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          ENTRAR
        </button>
        {isPhotographer && (
          <p className="mt-4 text-sm text-gray-600">
            É novo por aqui?{" "}
            <a href="/register" className="text-green-600 underline">
              Cadastre-se!
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
