import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Faq from "./pages/Faq";
import Alimentos from "./pages/Alimentos";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop from "./components/utils/ScrollToTop";
import LoginHelp from "./pages/LoginHelp";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/alimentos" element={<Alimentos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/loginHelp" element={<LoginHelp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
