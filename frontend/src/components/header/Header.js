import React, { useState } from "react";
import "../../App.css";
import { Tooltip } from "flowbite-react";
import LogoSnap from "../../assets/logo-minimal-light.png";
import ModalProfile from "../modalProfile/ModalProfile";
import NavButton from "../button/NavButton";
import GoBack from "../goBack/GoBack";
import { useNavigate } from "react-router-dom";

const Header = React.memo(({ text, showGoBack, showPageTitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const photographer = JSON.parse(sessionStorage.getItem("data-ph"));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate(); // Hook para navegação

  function logOut() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <header className="bg-[#E4E1DA] flex h-20 w-full items-center justify-between">
        <div className="flex items-center">
          <img className="mx-20 h-14" src={LogoSnap} alt="Logo Snap Grande" />
          {showGoBack && !!photographer && (
            <div className="voltar ml-16">
              <Tooltip content="Voltar">
                <GoBack />
              </Tooltip>
            </div>
          )}
          {showPageTitle && (
            <p className="page-title font-bold text-xl ml-24">{text}</p>
          )}
        </div>
        <div className="flex gap-10 mx-20">
          {!!photographer && (
            <div className="my-photoshoots">
              <Tooltip content="Meus clientes">
                <NavButton
                  onClick={() => navigate(`/mainpage/${photographer?.id}`)}
                  icon={
                    <span className="material-symbols-outlined">
                      <span className="material-symbols-outlined">groups</span>
                    </span>
                  }
                />
              </Tooltip>
            </div>
          )}
          {!!photographer && (
            <div className="my-profile">
              <Tooltip
                content={
                  <div className="flex flex-col items-center justify-center m-1">
                    <div className="flex items-center m-1">
                      <span className="material-symbols-outlined mr-2">
                        domain
                      </span>
                      <label className="text-lg">
                        {photographer.company_name}
                      </label>
                    </div>
                    <div className="flex items-center m-1">
                      <span className="material-symbols-outlined mr-2">
                        account_circle
                      </span>
                      <label>{photographer.name}</label>
                    </div>
                    <div className="flex flex-row gap-3 mx-2">
                      <Tooltip
                        style="light"
                        placement="bottom"
                        content="Editar perfil"
                      >
                        <NavButton
                          icon={
                            <span className="material-symbols-outlined">
                              border_color
                            </span>
                          }
                          onClick={openModal}
                        />
                      </Tooltip>
                      <Tooltip style="light" placement="bottom" content="Sair">
                        <NavButton
                          onClick={logOut}
                          icon={
                            <span className="material-symbols-outlined">
                              logout
                            </span>
                          }
                        />
                      </Tooltip>
                    </div>
                  </div>
                }
              >
                <NavButton
                  icon={
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  }
                />
              </Tooltip>
            </div>
          )}
        </div>
      </header>
      {isModalOpen && !!photographer && (
        <ModalProfile closeModal={closeModal} photographer={photographer} />
      )}
    </div>
  );
});

export default Header;
