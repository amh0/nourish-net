import React, { useContext, useState } from "react";
import "./UpdateUser.css";
import Input from "../input/Input";
import perfil from "../assets/perfil.jpg";
import { AuthContext } from "../../context/authContext";
import { PlusCircle } from "phosphor-react";
import axios, { toFormData } from "axios";

const UpdateUser = ({
  setOpenUpdate,
  btnClose,
  cambiarContrasenia,
  mensaje,
}) => {
  //ACTUALIZAR CONTRASENIA
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCambiarContrasenia, setShowCambiarContrasenia] = useState(
    cambiarContrasenia || false
  );
  const [errorMensaje, setErrorMensaje] = useState("");

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
    idusuario: currentUser.idusuario || "",
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

  const handleSubmitPass = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (
      newPassword === "" ||
      confirmNewPassword === "" ||
      currentPassword === ""
    ) {
      setErrorMensaje("Llene los espacios");
    } else if (newPassword !== confirmNewPassword) {
      setErrorMensaje("Las contraseñas no coinciden");
    } else if (!passwordRegex.test(newPassword)) {
      setErrorMensaje(
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener una longitud mínima de 8 caracteres"
      );
    } else {
      verificarContraseña(currentUser.idusuario, currentPassword, newPassword);
    }
  };

  const verificarContraseña = async (userId, currentPassword, newPassword) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/verifyPassword",
        {
          userId: userId,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      );

      setErrorMensaje(response.data.message);
      // Manejar la respuesta de la API
      if (response.data.success) {
        console.log("La contraseña es correcta y actualizacion realizada");
        if (currentUser.isAdmin) {
          let token = localStorage.getItem("user");

          if (token) {
            token = JSON.parse(token);
            token.actualizar_pass = "0";
            localStorage.setItem("user", JSON.stringify(token));

            console.log("Token actualizado:", token);
          } else {
            console.error("No se encontró un token válido en localStorage");
          }
        }
        setOpenUpdate(false);
      }
    } catch (error) {
      console.error("Error al verificar la contraseña:", error);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("idusuario", texts.idusuario);
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
        console.log("RES:", response.data);
        if (response.data && response.data.newTokenData) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.newTokenData)
          );
          window.location.reload();
          if (!btnClose) {
            setOpenUpdate(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <div class="container-u">
      <div class="update-container">
        <div className="update">
          {showCambiarContrasenia ? (
            <>
              <h2>Cambiar contraseña</h2>

              <div className="flex-column-container-update">
                {mensaje && (
                  <span style={{ color: "var(--tertiary_strong)" }}>
                    *{mensaje}
                  </span>
                )}
                <Input
                  type={"password"}
                  placeholder={"Contraseña actual"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder={"Nueva contraseña"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  type={"password"}
                  placeholder={"Confirmar nueva contraseña"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <span
                  style={{
                    color: "var(--textlight)",
                    fontSize: "var(--parr2)",
                  }}
                >
                  {errorMensaje}
                </span>
                <div className="container-button-updatePass">
                  {!btnClose && (
                    <button
                      style={{ background: "var(--tertiary_strong)" }}
                      className="button-update"
                      onClick={() => setShowCambiarContrasenia(false)}
                    >
                      Cancelar
                    </button>
                  )}

                  <button className="button-update" onClick={handleSubmitPass}>
                    Cambiar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--textlight)" }}>Editar Perfil</span>
                {!btnClose && (
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
                )}
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
                              texts.fechanaci
                                ? convertirFecha(texts.fechanaci)
                                : ""
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
                  <span
                    onClick={() => setShowCambiarContrasenia(true)}
                    style={{ color: "var(--textlight)", cursor: "pointer" }}
                  >
                    Cambiar contraseña
                  </span>
                </div>
              </form>

              <div className="container-button-update">
                <button className="button-update" onClick={handleSubmit}>
                  {" "}
                  Actualizar Datos{" "}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
