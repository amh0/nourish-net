import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Warning, CheckCircle } from "@phosphor-icons/react";

import { PageContext } from "../context/PageContext";
import { AuthContext } from "../context/authContext";
import Input from "../components/input/Input";
import "./css/Publicar.css";
import foodDefault from "../components/assets/data";

// default options
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
const Publicar = () => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState();
  const [unidad, setUnidad] = useState("");
  const [fecha_vencimiento, setFecha] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadState, setUploadState] = useState("none");
  const [formError, setFormError] = useState(false);
  const [nameEnabled, setNameEnabled] = useState(false);
  const { foodCat } = useContext(PageContext);
  const { currentUser } = useContext(AuthContext);
  const { uploadedQty, setUploadedQty } = useContext(AuthContext);

  const categories = foodCat.map((cat) => {
    return {
      value: cat.idcategoria,
      label: cat.nombre_cat,
    };
  });
  // seleccionar nombre
  const [nombreSel, setNombreSel] = useState();
  const seleccionarCategorias = (values) => {
    const defaultCat = categories.filter((cat) => values.includes(cat.value));
    setSelectedCat(defaultCat);
  };
  const handleNombreSelection = (name) => {
    setNombreSel(name);
    if (name.value === 0) {
      setNameEnabled(true);
    } else {
      setNameEnabled(false);
    }
    seleccionarCategorias(name.categoria);
    console.log(name);
  };
  // seleccionar categorias
  const [selectedCat, setSelectedCat] = useState([]);
  const handleCatSelection = (selectedCat) => {
    setSelectedCat(selectedCat);
    console.log("Categorias:");
    console.log(selectedCat);
    selectedCat.forEach((cat) => {
      console.log(cat.value);
    });
  };
  // image handling
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
  };
  // form handling
  const handleForm = () => {
    if (
      ((nameEnabled && nombre) || (!nameEnabled && nombreSel)) &&
      cantidad > 0 &&
      unidad &&
      fecha_vencimiento &&
      desc &&
      file
    ) {
      if (currentUser) {
        setFormError(false);
        handleData();
      } else {
        setFormError(true);
        console.log("Error identifying user...");
      }
    } else {
      setFormError(true);
      console.log("Error getting data from form...");
    }
  };
  const handleData = () => {
    const formData = new FormData();
    if (nameEnabled) {
      formData.append("nombre", nombre);
    } else {
      formData.append("nombre", nombreSel.label);
    }
    formData.append("descripcion", desc);
    formData.append("cantidad", cantidad);
    formData.append("unidad_medida", unidad);
    formData.append("fecha_vencimiento", fecha_vencimiento);
    formData.append("fecha_publicacion", moment().format());
    formData.append("idgeneral", currentUser.idusuario);
    formData.append("img", file);

    // categories handling
    selectedCat.forEach((item) => {
      formData.append("categoria[]", item.value);
    });
    setUploadState("loading");
    axios
      .post(
        "https://nourish-net-api.onrender.com/api/products/upload",
        formData
      )
      .then((res) => {
        if (res.data.Status === "OK") {
          console.log("Data inserted");
          setUploadState("success");
          setUploadedQty((prev) => prev + 1);
        } else {
          console.log("An error has occurred");
          setUploadState("error");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleNumberChange = (e) => {
    if (e.target.value) {
      if (e.target.value > 0) {
        setCantidad(e.target.value);
      } else {
        setCantidad(1);
      }
    } else {
      setCantidad();
    }
  };
  const clearFields = () => {
    setCantidad("");
    setUnidad("");
    setDesc("");
    setFecha("");
    setNombreSel("");
    setNameEnabled(false);
    setNombre("");
    setUploadState("none");
    setFile();
    setPreview();
    setSelectedCat([]);
    console.log("clicked");
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
        <Select
          className="list-option"
          options={foodDefault}
          components={makeAnimated()}
          closeMenuOnSelect={true}
          value={nombreSel}
          onChange={handleNombreSelection}
          styles={listStyle}
          noOptionsMessage={() =>
            "Sin resultados, selecciona 'Otro' para añadir un alimento"
          }
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
        {nameEnabled ? (
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
        ) : null}
        <div className="row-wrapper">
          <div className="input-wrapper">
            <Input
              id="cantidad"
              name="cantidad"
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => handleNumberChange(e)}
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
            min={moment().format("YYYY-MM-DD")}
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
          value={desc}
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
            placeholder={"Haz clic para seleccionar"}
            isDisabled={!nameEnabled}
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
        {formError ? (
          <p className="parr1 ">
            {" "}
            <span className="accent-tertiary">* </span>Verifica que los campos
            contengan datos validos
          </p>
        ) : null}
        <div className="button-container">
          <button
            className="btn bg0-secondary-v secondary-brd"
            onClick={handleForm}
          >
            Agregar producto
          </button>
          {uploadedQty > 0 ? (
            <Link className="link" to="/donar/entrega">
              <button className="btn secondary-v">
                Publicar donación ({uploadedQty})
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </form>
      {uploadState !== "none" ? (
        <div className={"state-container " + uploadState} onClick={clearFields}>
          {uploadState === "loading" ? (
            <>
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="parr1">Agregando alimento...</p>
            </>
          ) : uploadState === "success" ? (
            <>
              <CheckCircle size={32} color="var(--secondary)" weight="light" />
              <p className="parr1 boldparr">¡Alimento agregado!</p>
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
