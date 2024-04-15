import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CartPage from "./pages/CartPage";
import DetalleDonacion from "./pages/DetalleDonacion";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import DonacionesVoluntario from "./pages/DonacionesVoluntario";
function App() {
  const { currentUser } = useContext(AuthContext);
  // const currentUser = null;
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
          <Route path="/donaciones" element={<MisDonaciones />}>
            <Route path=":donacionId" element={<DetalleDonacion />} />
          </Route>
          <Route path="/donar" element={<Publicar />} />
          {currentUser && <Route path="/donar" element={<Publicar />} />}{" "}
          {/*verify donor*/}
          {!currentUser && <Route path="/login" element={<Login />} />}
          {!currentUser && <Route path="/signup" element={<Signup />} />}
          {!currentUser && <Route path="/loginHelp" element={<LoginHelp />} />}
          {currentUser && <Route path="/donantes" element={<Donantes />} />}
          {currentUser && (currentUser.isDonor || currentUser.isAdmin) && (
            <Route path="/donaciones" element={<MisDonaciones />}>
              <Route path=":donacionId" element={<DetalleDonacion />} />
            </Route>
          )}
          {currentUser && (currentUser.isDonor || currentUser.isAdmin) && (
            <Route path="/detalles" element={<DetalleDonacion />}>
              <Route path=":donacionId" element={<DetalleDonacion />} />
            </Route>
          )}
          {currentUser && <Route path="/peticiones" element={<Peticiones />} />}
          {currentUser && currentUser.isVolunteer && (
            <>
              <Route path="/tareas" element={<Tareas />} />
              <Route
                path="/donaciones/entregas"
                element={<DonacionesVoluntario />}
              />
            </>
          )}
          {/*verify volunteer*/}
          {currentUser && (
            <Route path="/notificaciones" element={<Notificaciones />} />
          )}
          {currentUser && !currentUser.isAdmin && (
            <Route path="/solicitar" element={<CartPage />} />
          )}
          {currentUser && <Route path="/perfil" element={<Perfil />} />}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
