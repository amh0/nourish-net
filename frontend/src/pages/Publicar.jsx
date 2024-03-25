import React, { useState } from "react";
import axios from "axios";
import Input from "../components/input/Input";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./css/Publicar.css";

import { Warning, CheckCircle, SpinnerGap } from "@phosphor-icons/react";
const Publicar = () => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState();
  const [unidad, setUnidad] = useState("");
  const [fecha_vencimiento, setFecha] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadState, setUploadState] = useState("none");
  // working
  // list options
  const categories = [
    { value: "Fruta", label: "Fruta" },
    { value: "Verdura", label: "Verdura" },
    { value: "Cereales", label: "Cereales" },
    { value: "Bebidas", label: "Bebidas" },
    { value: "Organicos", label: "Organicos" },
    { value: "Enlatados", label: "Enlatados" },
    { value: "Envasados", label: "Envasados" },
    { value: "Ingredientes", label: "Ingredientes" },
  ];
  const listStyle = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
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
  const [selectedCat, setSelectedCat] = useState([]);
  // image handling
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleForm = () => {
    // TODO validation
    // console.log(nombre);
    // console.log(cantidad);
    // console.log(unidad);
    // console.log(fecha_vencimiento);
    // console.log(desc);
    if (nombre && cantidad > 0 && unidad && fecha_vencimiento && desc && file) {
      handleData();
    }
    //handleUpload();
    else {
      console.log("error");
    }
  };
  const handleData = () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", desc);
    formData.append("cantidad", cantidad);
    formData.append("unidad_medida", unidad);
    formData.append("fecha_vencimiento", fecha_vencimiento);
    formData.append("fecha_publicacion", new Date().toJSON());
    formData.append("img", file);
    //console.log([...formData]);
    setUploadState("loading");
    axios
      .post("http://localhost:3001/api/products/upload", formData)
      .then((res) => {
        if (res.data.Status === "OK") {
          console.log("Data inserted");
          setUploadState("success");
        } else {
          console.log("An error has occurred");
          setUploadState("error");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("img", file);
    axios
      .post("http://localhost:3001/api/products/upload", formData)
      .then((res) => {
        if (res.data.Status === "OK") {
          console.log("Succeded");
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleProductPublish = async () => {
    const formData = new FormData();
    formData.append("img", file);
    // formData.append(nombre);
    try {
      const res = await axios.post("http://localhost:3001/uploadimg", formData);
      if (res.data.Status === "Success") {
        console.log("Succeded!!!!");
      } else {
        console.log("Failed!!!!");
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  const handleCatSelection = (selectedCat) => {
    setSelectedCat(selectedCat);
  };
  return (
    <div className="publication">
      <h4 className="title4">Registra tu donación</h4>
      <form
        action="/donar"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="input-wrapper">
          <Input
            id="nombre"
            name="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre producto"
          />
        </div>
        <div className="row-wrapper">
          <div className="input-wrapper">
            <Input
              id="cantidad"
              name="cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Cantidad"
            />
          </div>
          <div className="input-wrapper">
            <Input
              id="unidad_medida"
              name="unidad_medida"
              type="text"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              placeholder="Unidad de medida"
            />
          </div>
        </div>
        <div className="input-wrapper">
          <Input
            id="fecha_vencimiento"
            type="date"
            value={fecha_vencimiento}
            onChange={(e) => setFecha(e.target.value)}
            placeholder="Fecha de Vencimiento"
          />
        </div>
        <textarea
          className="text-area parr1 "
          name="descripcion"
          id="descripcion"
          cols="30"
          rows="10"
          placeholder="Descripcion"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <div className="row-wrapper">
          <div className="form-label parr1">Categoria:</div>
          <Select
            className="list-option"
            options={categories}
            components={makeAnimated()}
            closeMenuOnSelect={false}
            value={selectedCat}
            onChange={handleCatSelection}
            isMulti={true}
            styles={listStyle}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
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
        <div className="row-wrapper">
          <div className="form-label parr1">Direccion:</div>
          <div className="parr1 text-address"> Av. Ballivian</div>
        </div>
        <div className="row-wrapper">
          <label
            className="btn bg-text-v custom-file-upload"
            htmlFor="file-upload"
          >
            <input
              id="file-upload"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleFile}
            />
            <span>Subir foto</span>
          </label>
          {preview ? (
            <div className="img-container">
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
        <button className="btn secondary-v" onClick={handleForm}>
          Publicar donación
        </button>
      </form>
      {uploadState !== "none" ? (
        <div className={"state-container " + uploadState}>
          {uploadState === "loading" ? (
            <>
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="parr1">Publicando donación...</p>
            </>
          ) : uploadState === "success" ? (
            <>
              <CheckCircle size={32} color="var(--secondary)" weight="light" />
              <p className="parr1 boldparr">¡Donacion publicada!</p>
              <p className="parr2">Aceptar</p>
            </>
          ) : uploadState === "error" ? (
            <>
              <Warning size={32} color="var(--tertiary)" weight="light" />
              <p className="parr1 boldparr">Error</p>
              <p className="parr2">Ha ocurrido un error inesperado</p>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Publicar;
