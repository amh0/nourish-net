import React, { useContext, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import "./RequestPosting.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Select from "react-select";
import Input from "../input/Input";

import { Heart, MapPin, Image } from "phosphor-react";
import perfil from "../assets/perfil.jpg";
import { Link } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";

moment.locale("es");

const RequestPosting = () => {
  const { currentUser } = useContext(AuthContext);

  const [selectedCat, setSelectedCat] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [contacto, setContacto] = useState("");
  const [ubicacionInput, setUbicacionInput] = useState("");
  const [formError, setFormError] = useState(false);
  const [ubiVisible, setUbiVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // image
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
  };

  //Select
  const handleCatSelection = (selectedOption) => {
    if (Array.isArray(selectedOption)) {
      setSelectedCat(selectedOption);
    } else if (selectedOption) {
      setSelectedCat([selectedOption]);
    } else {
      setSelectedCat([]);
    }
  };

  //publicar
  const handlePublish = () => {
    console.log(file);
    if (
      titulo &&
      descripcion &&
      ubicacionInput &&
      selectedCat &&
      file &&
      contacto
    ) {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("ubicacion", ubicacionInput);
      formData.append("contacto", contacto);
      formData.append("img", file);
      formData.append("prioridad", selectedCat[0].label);
      formData.append("idusuario", currentUser.idusuario);
      const fechaPublicacion = moment().format("YYYY-MM-DD HH:mm:ss");
      formData.append("fecha_publicacion", fechaPublicacion);
      handleData(formData);

      setSelectedCat(null);
      setTitulo("");
      setDescripcion("");
      setContacto("");
      setUbicacionInput("");
      setFile();
      setPreview();
      setFormError(false);
    } else {
      setFormError(true);
      console.log("error");
    }
  };

  //Ubicacion
  const toggleUbiVisibility = () => {
    setUbiVisible(!ubiVisible);
    setUbicacionInput("");
  };

  const handleData = (data) => {
    console.log("Datos a enviar al backend:", data);
    axios
      .post("http://localhost:3001/api/peticiones/upload-peticion", data)
      .then((res) => {
        if (res.data.Status === "OK") {
          console.log("Data inserted");
        } else {
          console.log("An error has occurred");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddImage = () => {
    const inputElement = document.getElementById("file-upload");
    inputElement.click();
  };

  const listStyle = {
    control: (styles) => ({
      ...styles,
      height: "1px",
      width: "300px",
      backgroundColor: "white",
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#E2F0EE",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        cursor: "pointer",
      };
    },
  };

  const prioridad = [
    { value: "1", label: "Urgente" },
    { value: "2", label: "Alta" },
    { value: "3", label: "Media" },
    { value: "4", label: "Baja" },
    { value: "5", label: "Permanente / Continua" },
  ];

  return (
    <div className="request-posting-container">
      <div className="request-posting">
        <div className="request-posting-content">
          <div className="user-section">
            <div className="user-info">
              <div className="photo-container">
                <img src={currentUser.img_perfil || perfil} alt="" />
              </div>
            </div>
            <div className="request-posting-text">
              <div className="select-priority-container">
                <Select
                  className="list-option"
                  options={prioridad}
                  closeMenuOnSelect={true}
                  value={selectedCat}
                  onChange={handleCatSelection}
                  isMulti={false}
                  styles={listStyle}
                  placeholder={"Haz clic para seleccionar"}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                      ...theme.colors,
                      text: "orangered",
                      primary25: "#E2F0EE",
                      primary50: "#99CBC5",
                      primary: "#red",
                    },
                  })}
                />
              </div>
              <div className="name-container">
                <span className="user-name">{currentUser.nombre}</span>
              </div>
              <div className="input-container-p">
                <div class="input-container-title">
                  <Input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Titulo"
                  />
                </div>

                <div class="input-container-title">
                  <Input
                    id="contacto"
                    type="text"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Contacto de referencia"
                  />
                </div>

                <textarea
                  className="full-width-inpu "
                  name="descripcion"
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  cols="30"
                  rows="10"
                  placeholder={`Introduce una breve descipción`}
                ></textarea>
              </div>
            </div>
          </div>
          {formError ? (
            <p className="parr1-peticion">
              {" "}
              <span className="accent-tertiary">* </span>Llenar todos los campos
            </p>
          ) : null}
          <div className="content-section">
            <div className="location" onClick={toggleUbiVisibility}>
              <MapPin size={20} color="var(--textlight)" weight="thin" />
              <p>Agregar Ubicación</p>
            </div>
            <div className="location" onClick={handleAddImage}>
              <Image size={20} color="#222222" weight="thin" />
              <p>Agregar Imagen</p>
            </div>
            <div className="location">
              <button className="btn btn secondary-v" onClick={handlePublish}>
                Publicar
              </button>
            </div>
          </div>
          {ubiVisible && (
            <div className="modal">
              <Input
                type="text"
                value={ubicacionInput}
                onChange={(e) => setUbicacionInput(e.target.value)}
                placeholder="Agregar ubicación"
              />
            </div>
          )}
          <div className="row-wrapper">
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </label>
            {preview ? (
              <div className="img-container-peticion">
                {
                  <img
                    className="preview-img"
                    src={preview}
                    alt="imagen de producto"
                  />
                }
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPosting;
