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
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import Informes from "./pages/Informes";

function App() {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      console.log("Usuario no autenticado. Redireccionando...");
    }
  }, [currentUser]);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
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
          {currentUser && <Route path="/donar" element={<Publicar />} />}{" "}
          {/* verify donor */}
          {!currentUser && <Route path="/login" element={<Login />} />}
          {!currentUser && <Route path="/signup" element={<Signup />} />}
          {!currentUser && <Route path="/loginHelp" element={<LoginHelp />} />}
          {currentUser && <Route path="/donantes" element={<Donantes />} />}
          {currentUser && currentUser.isDonor && (
            <Route path="/mis-donaciones" element={<MisDonaciones />} />
          )}
          {currentUser && <Route path="/peticiones" element={<Peticiones />} />}
          {currentUser && currentUser.isVolunteer && (
            <Route path="/tareas" element={<Tareas />} />
          )}
          {/* verify volunteer */}
          {currentUser && (
            <Route path="/notificaciones" element={<Notificaciones />} />
          )}
          {currentUser && <Route path="/perfil" element={<Perfil />} />}
          {currentUser.isAdmin && <Route path="/informes" element={<Informes />} />}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
