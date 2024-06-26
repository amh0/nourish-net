import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Faq from "./pages/Faq";
import Alimentos from "./pages/Alimentos";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop from "./components/utils/ScrollToTop";
import LoginHelp from "./pages/LoginHelp";
import Publicar from "./pages/Publicar";
import Footer from "./components/footer/Footer";
import ProfileNavbar from "./components/profileNavbar/ProfileNavbar ";
import Donantes from "./pages/Donantes";
import Peticiones from "./pages/Peticiones";
import MisDonaciones from "./pages/MisDonaciones";
import Tareas from "./pages/Tareas";
import Notificaciones from "./pages/Notificaciones";
import Perfil from "./pages/Perfil";
import CoordSolicitud from "./pages/CoordSolicitud";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import Informes from "./pages/Informes";

import CartPage from "./pages/CartPage";
import DetalleDonacion from "./pages/DetalleDonacion";
import DonacionesVoluntario from "./pages/DonacionesVoluntario";
import Evaluar from "./pages/Evaluar";
import UpdateUser from "./components/updateUser/UpdateUser";

import ChatbotComponent from "./components/chatBot/Chatbot";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      console.log("Usuario no autenticado. Redireccionando...");
    }
    setOpenUpdate(true);
  }, [currentUser]);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        {openUpdate &&
          currentUser &&
          currentUser.isAdmin &&
          currentUser.actualizar_pass === 1 && (
            <UpdateUser
              setOpenUpdate={setOpenUpdate}
              btnClose={true}
              cambiarContrasenia={true}
              mensaje={"Debe cambiar su contraseña"}
            />
          )}
        {currentUser ? <ProfileNavbar /> : <NavBar />}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/alimentos" element={<Alimentos />} />
          <Route path="/producto" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route
            path="/producto/:productId/solicitud"
            element={<CoordSolicitud />}
          />
          {currentUser && <Route path="/donar" element={<Publicar />} />}

          {/*verify donor*/}
          {!currentUser && <Route path="/login" element={<Login />} />}
          {!currentUser && <Route path="/signup" element={<Signup />} />}
          {!currentUser && <Route path="/loginHelp" element={<LoginHelp />} />}
          {currentUser && <Route path="/donantes" element={<Donantes />} />}
          {/* donaciones */}
          {currentUser && (
            <>
              <Route path="/donaciones" element={<MisDonaciones />} />
              <Route path="/detalles" element={<DetalleDonacion />}>
                <Route path=":donacionId" element={<DetalleDonacion />} />
              </Route>
            </>
          )}
          {currentUser && <Route path="/peticiones" element={<Peticiones />} />}
          {/*verify volunteer*/}
          {currentUser && currentUser.isVolunteer && (
            <>
              <Route path="/tareas" element={<Tareas />} />
              <Route
                path="/donaciones/entregas"
                element={<DonacionesVoluntario />}
              />
              <Route
                path="/donaciones/entregas/detalles"
                element={<DetalleDonacion dePaginaTareas={true} />}
              >
                <Route
                  path=":donacionId"
                  element={<DetalleDonacion dePaginaTareas={true} />}
                />
              </Route>
            </>
          )}
          {/* Evaluacion */}
          {currentUser && (currentUser.isVolunteer || currentUser.isAdmin) && (
            <>
              <Route path="/evaluacion" element={<Evaluar />} />
              <Route path="/evaluacion" element={<Product />}>
                <Route path=":productId" element={<Product />} />
              </Route>
            </>
          )}
          {currentUser && (
            <Route path="/notificaciones" element={<Notificaciones />} />
          )}
          {currentUser && !currentUser.isAdmin && (
            <>
              <Route path="/solicitar" element={<CartPage isCart={true} />} />
              <Route
                path="/donar/entrega"
                element={<CartPage isCart={false} />}
              />
            </>
          )}

          {currentUser && <Route path="/perfil/:id" element={<Perfil />} />}
          {currentUser && currentUser.isAdmin && (
            <Route path="/informes" element={<Informes />} />
          )}
          <Route path="/chatbot" element={<ChatbotComponent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <ChatbotComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
