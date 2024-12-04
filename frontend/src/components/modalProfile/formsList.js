import React, { useState, useEffect } from "react";
import "../../App.css";
import InputDefault from "../input/Input";
import InputPassword from "../input/InputPassword";
import InputEmail from "../input/InputEmail";
import InputFile from "../input/InputFile";
import { Button } from "flowbite-react";

const FormsList = React.memo(() => {
  // Obtendo dados iniciais do sessionStorage
  const initialData = JSON.parse(sessionStorage.getItem("data-ph")) || {};

  // Estados com valores iniciais vindos do sessionStorage ou padrão
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);

  // UseEffect para configurar valores iniciais
  useEffect(() => {
    if (initialData) {
      setCompanyName(initialData.company_name || "");
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setDocument(initialData.document || "");
      setDescription(initialData.description || "");
      setLogo(initialData.logo || null);
    }
  }, [initialData]);

  const handleSave = () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    const payload = {
      companyName,
      name,
      email,
      document,
      newPassword,
      password,
      description,
      logo,
    };

    console.log("Payload montado:", payload);

    // Aqui você pode fazer a requisição para enviar o payload
    // axios.post('sua-api-endpoint', payload).then(...).catch(...);
  };

  return (
    <div className="lista-forms-perfil">
      <InputDefault
        icon={<span className="material-symbols-outlined">corporate_fare</span>}
        text="Nome da empresa"
        value={companyName}
        onValueChange={setCompanyName}
      />
      <InputDefault
        icon={<span className="material-symbols-outlined">person</span>}
        text="Nome"
        value={name}
        onValueChange={setName}
      />
      <InputEmail
        icon={<span className="material-symbols-outlined">mail</span>}
        text="Email"
        value={email}
        onValueChange={setEmail}
      />
      <InputDefault
        icon={<span className="material-symbols-outlined">contact_page</span>}
        text="Documento"
        value={document}
        onValueChange={setDocument}
      />
      <InputPassword
        icon={<span className="material-symbols-outlined">key</span>}
        text="Nova senha"
        value={newPassword}
        onValueChange={setNewPassword}
      />
      <InputPassword
        icon={<span className="material-symbols-outlined">vpn_key_alert</span>}
        text="Confirmar nova senha"
        value={confirmNewPassword}
        onValueChange={setConfirmNewPassword}
      />
      <InputPassword
        icon={<span className="material-symbols-outlined">lock</span>}
        text="Senha"
        value={password}
        onValueChange={setPassword}
      />
      <InputDefault
        icon={<span className="material-symbols-outlined">description</span>}
        text="Descrição"
        value={description}
        onValueChange={setDescription}
      />
      <InputFile
        icon={<span className="material-symbols-outlined">image</span>}
        text="Logo"
        value={logo}
        onValueChange={(file) => {
          const reader = new FileReader();
          reader.onloadend = () => setLogo(reader.result);
          reader.readAsDataURL(file);
        }}
      />
      <hr className="mt-2" />
      <div className="flex justify-center items-center mt-3">
        <Button onClick={handleSave} className="close-modal-btn bg-[#353438]">
          <b>Salvar</b>
        </Button>
      </div>
    </div>
  );
});

export default FormsList;
