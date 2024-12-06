import React, { useState, useRef } from "react";
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
  const inputsRef = useRef([]);
  sessionStorage.clear();

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value) {
        // Auto-focar para o próximo campo quando algo é digitado
        if (index < code.length - 1) {
          document.getElementById(`input-${index + 1}`).focus();
        }
      } else {
        // Auto-focar para o campo anterior quando algo é apagado
        if (index > 0) {
          document.getElementById(`input-${index - 1}`).focus();
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (isPhotographer) {
      try {
        // Requisição para a rota de login do fotógrafo
        const response = await axios.post(
          "http://localhost:3001/photographers/login",
          {
            email,
            password,
          }
        );

        // Se o login for bem-sucedido

        const photographer = await axios.get(
          `http://localhost:3001/photographers/${response.data.photographer.id}`
        );
        delete photographer.data.password;
        sessionStorage.setItem("data-ph", JSON.stringify(photographer.data));
        navigate(`/mainpage/${photographer.data.id}`);
      } catch (error) {
        // Exibe um alerta em caso de falha no login
        console.error("Erro no login do fotógrafo:", error);
        alert("Email ou senha inválidos. Por favor, tente novamente.");
      }
    } else {
      const codeValue = code.join("");

      try {
        // Fazendo a requisição à API para validação do cliente
        const response = await axios.get(
          `http://localhost:3001/albums/access_hash/${codeValue}`
        );
        console.log("Dados do cliente:", response.data);

        if (response.data.id == id) {
          sessionStorage.setItem("hash-cl", codeValue);
          navigate(`/photoshoot/${id}`);
        }
      } catch (error) {
        alert(
          "Não foi possível acessar o álbum com o código informado. Verifique o código e tente novamente."
        );
        setCode(Array(6).fill(""));
      }
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-neutral-50 shadow-lg rounded-b-xl p-8 h-max w-full max-w-md text-center">
        <img
          src={logoLight}
          alt="Snap Share Logo"
          className="mx-auto m-5 w-56"
        />

        <h2 className="text-xl font-semibold mb-4">
          {isPhotographer ? "LOGIN" : "Acesse seu álbum de fotos"}
        </h2>
        <div className="flex justify-center mb-6"></div>
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
                  className="w-14 h-14 text-center text-2xl font-extrabold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 w-full rounded-md hover:bg-gray-800 transition"
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
