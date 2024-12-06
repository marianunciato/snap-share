import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./screens/mainPage/MainPage";
import AccessCode from "./screens/accessCode/AccessCode";
import AddPhotoshoot from "./screens/addPhotoshoot/AddPhotoshoot";
import PhotoShootsFromFoldernPage from "./screens/PhotoShootsFromFolder/PhotoShootsFromFolder";
import PhotoShoot from "./screens/photoShoot/PhotoShoot";
import "./App.css";

function App() {
  function checkIsLogged() {
    return !!sessionStorage.getItem("data-ph")?.length;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("resize-element");
    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        console.log("Element resized:", entries[0].contentRect);
      });
    });

    resizeObserver.observe(element);
  });

  return (
    <Router>
      <div className="App flex">
        <Routes>
          {/* Página de login */}
          <Route path="/" element={<AccessCode isClient={false} />} />
          <Route
            path="/accesscode/:id"
            element={<AccessCode isClient={true} />}
          />

          {/* Se o usuário estiver logado, renderiza as páginas protegidas */}
          {checkIsLogged ? (
            <>
              <Route path="/mainpage/:photographerId" element={<MainPage />} />
              <Route
                path="/folder/:folderId"
                element={<PhotoShootsFromFoldernPage />}
              />
              <Route
                path="/addphotoshoot/:folderId"
                element={<AddPhotoshoot />}
              />
              <Route
                path="/photoshoot/:photoShootId"
                element={<PhotoShoot />}
              />
            </>
          ) : (
            // Se o usuário não estiver logado, redireciona para a página de acesso
            <>
              <Route
                path="/mainpage/:photographerId"
                element={<Navigate to="/" />}
              />
              <Route
                path="/addphotoshoot/:folderId"
                element={<Navigate to="/" />}
              />
              <Route path="/album/:albumId" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
