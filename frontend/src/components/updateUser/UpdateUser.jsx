import React, { useContext, useState } from "react";
import "./UpdateUser.css";
import Input from "../input/Input";
import perfil from "../assets/perfil.jpg";
import { AuthContext } from "../../context/authContext";
import { PlusCircle } from "phosphor-react";
import axios, { toFormData } from "axios";

const UpdateUser = ({ setOpenUpdate }) => {
  const imgPath = "http://localhost:3001/img/";
  const { currentUser } = useContext(AuthContext);
  const [entityTypes, setEntityTypes] = useState([
    "Asilo",
    "Banco de alimentos",
    "Centro de atención a personas con discapacidad",
    "Centro de atención a personas en situación de calle",
    "Centro de rehabilitación",
    "Comedor comunitario",
    "Distribuidor de alimentos",
    "Empresa de catering",
    "Escuela o institución educativa",
    "Escuela y universidad",
    "Granja",
    "Hogar de ancianos",
    "Orfanato",
    "Organización benéfica y sin fines de lucro",
    "Restaurante",
    "Supermercado",
    "Tienda de abarrotes",
  ]);

  const [searchTerm, setSearchTerm] = useState(currentUser.tipo_entidad || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredEntityTypes, setFilteredEntityTypes] = useState(entityTypes);

  const [nombre, setNombre] = useState(currentUser.nombre || "");
  const [apellido_pat, setApellido_pat] = useState(
    currentUser.apellido_pat || ""
  );
  const [apellido_mat, setApellido_mat] = useState(
    currentUser.apellido_mat || ""
  );
  const [fechanaci, setFechanaci] = useState(currentUser.fechanaci || "");
  const [direccion, setDireccion] = useState(currentUser.direccion || "");
  const [telefono, setTelefono] = useState(currentUser.telefono || "");
  const [celular, setCelular] = useState(currentUser.celular || "");
  const [tipo_entidad, setTipo_entidad] = useState(searchTerm || "");

  const [texts, setTexts] = useState({
    nombre: currentUser.nombre || "",
    apellido_pat: currentUser.apellido_pat || "",
    apellido_mat: currentUser.apellido_mat || "",
    fechanaci: currentUser.fechanaci || "",
    direccion: currentUser.direccion || "",
    telefono: currentUser.telefono || "",
    celular: currentUser.celular || "",
    celular: currentUser.celular || "",
    img_perfil: currentUser.img_perfil || "",
    tipo_entidad: searchTerm || "",
  });
  const [openForgetPassword, setOpenForgetPassword] = useState(false);

  const handleForgetPasswordClick = () => {
    setOpenForgetPassword(!openForgetPassword);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
    const filtered = entityTypes.filter((type) =>
      type.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEntityTypes(filtered);
    setShowDropdown(true);
  };

  const handleSelectEntity = (entity) => {
    setSearchTerm(entity);
    setShowDropdown(false);
  };

  // image
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(currentUser.img_perfil || perfil);
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddImage = () => {
    const inputElement = document.getElementById("file-upload");
    inputElement.click();
  };

  const convertirFecha = (fecha) => {
    const fechaOriginal = new Date(fecha);
    const anio = fechaOriginal.getFullYear();
    const mes = String(fechaOriginal.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaOriginal.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };

  const handleChange = (e, name) => {
    setTexts((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("nombre", texts.nombre);
    formData.append("apellido_pat", texts.apellido_pat);
    formData.append("apellido_mat", texts.apellido_mat);
    formData.append("fechanaci", texts.fechanaci);
    formData.append("direccion", texts.direccion);
    formData.append("telefono", texts.telefono);
    formData.append("celular", texts.celular);
    formData.append("img", file);
    formData.append("tipo_entidad", searchTerm);

    handleData(formData);
  };

  const handleData = (data) => {
    console.log("Datos a enviar al backend:", data);
    const token = localStorage.getItem("user");

    if (!token) {
      console.error("No se encontró el token de autenticación.");
      return;
    }
    console.log(file);

    const userData = {
      ...data,
      token: token,
      //   img: file || null,
    };

    data.append("token", token);
    // axios.defaults.withCredentials = true;

    axios
      .put("http://localhost:3001/api/user/updateUser", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.newTokenData) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.newTokenData)
          );
          window.location.reload();
          setOpenUpdate(false);
        }

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <div class="container-u">
      <div class="update-container">
        <div className="update">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--textlight)" }}>Editar Perfil</span>
            <button
              onClick={() => setOpenUpdate(false)}
              style={{
                backgroundColor: "var(--tertiary)",
                color: "var(--background0)",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
              }}
            >
              X
            </button>
          </div>
          <form>
            <div className="update-add-profile-image">
              <div className="update-profile-image-container">
                <img
                  // src={preview && imgPath + preview}

                  src={
                    preview === currentUser.img_perfil
                      ? imgPath + preview
                      : preview
                  }
                  alt="Profile"
                  className="update-profile-image"
                />
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={handleFile}
                    style={{ display: "none" }}
                  />
                </label>

                <div
                  className="update-profile-image-overlay"
                  onClick={handleAddImage}
                >
                  <PlusCircle
                    size={200}
                    color="var(--secondary)"
                    weight="fill"
                  />
                </div>
              </div>
            </div>

            <div className="flex-column-container-update">
              <Input
                type={"text"}
                placeholder={"Nombre"}
                // value={texts.nombre || ""}
                value={texts.nombre || ""}
                onChange={(e) => handleChange(e, "nombre")}
              />

              {!currentUser.isOrganization && (
                <div className="flex-column-container-update">
                  {/* <Input
                  type={"text"}
                  placeholder={"Nombre"}
                  value={texts.nombre || ""}
                  onChange={(e) => handleChange(e, "nombre")}
                /> */}

                  <Input
                    type={"text"}
                    placeholder={"Apellido Paterno"}
                    value={texts.apellido_pat || ""}
                    onChange={(e) => handleChange(e, "apellido_pat")}
                  />
                  <Input
                    type={"text"}
                    placeholder={"Apellido Materno"}
                    value={texts.apellido_mat || ""}
                    onChange={(e) => handleChange(e, "apellido_mat")}
                  />

                  {!currentUser.isAdmin && (
                    <div className="flex-column-container-update">
                      <Input
                        type={"date"}
                        placeholder={"Fecha nacimiento"}
                        value={
                          texts.fechanaci ? convertirFecha(texts.fechanaci) : ""
                        }
                        onChange={(e) => handleChange(e, "fechanaci")}
                      />
                    </div>
                  )}
                </div>
              )}

              {!currentUser.isAdmin && (
                <div className="flex-column-container-update">
                  <Input
                    type={"text"}
                    placeholder={"Dirección"}
                    value={texts.direccion || ""}
                    onChange={(e) => handleChange(e, "direccion")}
                  />
                  <Input
                    type={"text"}
                    placeholder={"Teléfono"}
                    value={texts.telefono || ""}
                    onChange={(e) => handleChange(e, "telefono")}
                  />
                  <Input
                    type={"text"}
                    placeholder={"Celular"}
                    value={texts.celular || ""}
                    onChange={(e) => handleChange(e, "celular")}
                  />
                </div>
              )}

              {currentUser.isOrganization && (
                <div className="flex-column-container-update">
                  <div className="dropdown">
                    <Input
                      type="text"
                      id="entityType"
                      placeholder="Tipo de entidad"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    {showDropdown && (
                      <ul className="dropdown-menu">
                        {filteredEntityTypes.map((type, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectEntity(type)}
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="container-button-update">
            <button className="button-update" onClick={handleSubmit}>
              {" "}
              Actualizar Datos{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
