import React, { useState, useEffect } from "react";
import Input from "../input/Input";
import { PlusCircle } from "phosphor-react";
import camera from "../assets/camera.jpg";
import axios from "axios";

import "./DataUpdater.css";
import EditableTable from "../editableTable/EditableTable";

const DataUpdater = ({ type, id, data, URLedit, updateShow, btnCont }) => {
  const imgPath = "https://nourish-net-api.onrender.com/img/";

  const [inputData, setInputData] = useState({});
  // console.log("INITIAL:", inputData);
  // image
  const [file, setFile] = useState();
  const [responsables, setResponsables] = useState([]);
  const [preview, setPreview] = useState(null);
  const [mesajeError, setMesajeError] = useState("");

  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error("Los datos no son un array:", data);
      return;
    }
    const initialInputData = {};
    data.forEach((item) => {
      if (item.tipo === "img") {
        initialInputData["img"] = item.contenido || "";
      }
      if (item.input) {
        const key = item.nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "_")
          .toLowerCase();
        initialInputData[key] = item.contenido || "";
      }
    });
    initialInputData["id"] = id || "";
    // console.log("datos: ", initialInputData);

    setInputData(initialInputData);
  }, [data]);

  const handleUpdateData = async () => {
    // console.log(inputData);
    inputData["img"] = file;

    const formData = new FormData();
    Object.keys(inputData).forEach((key) => {
      formData.append(key, inputData[key]);
    });
    // console.log("form", inputData);

    try {
      const response = await axios.put(`${URLedit}`, formData);
      if (response.status === 200) {
        if (response.data.message) {
          if (response.data.message === "ok") {
            setMesajeError("");
            console.log("Datos actualizados correctamente");
            updateShow(false);
          } else {
            setMesajeError(response.data.message);
          }
        } else {
          console.log("Datos actualizados correctamente");
          updateShow(false);
        }
      } else {
        console.log("Error al actualizar datos:", response.statusText);
      }
    } catch (err) {
      console.log("Error al actualizar datos:", err);
    }
  };

  const handleInputChange = (key, value) => {
    if (!key) {
      console.error("La clave 'key' no está definida correctamente.");
      return;
    }
    const newKey = key
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();

    setInputData({
      ...inputData,
      [newKey]: value,
    });
  };

  const fetchResp = async () => {
    try {
      const result = await axios.get(
        "https://nourish-net-api.onrender.com/api/user/responsables",
        {
          params: {
            idOrg: id || "",
          },
        }
      );
      const modifiedResponsables = result.data.map((responsable) => ({
        idResp: responsable.idresp,
        NOMBRE: responsable.nombre,
        "APELLIDO PAT": responsable.apellido_pat,
        "APELLIDO MAT": responsable.apellido_mat,
        DIRECCION: responsable.direccion,
        TELEFONO: responsable.telefono,
        CELULAR: responsable.celular,
        idOrg: responsable.idorg,
      }));
      setResponsables(modifiedResponsables);
    } catch (err) {
      console.log("Error obteniendo responsables");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResp();
  }, [id]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleAddImage = () => {
    const inputElement = document.getElementById("file-upload");
    inputElement.click();
  };

  const renderInputs = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div>No hay datos para mostrar</div>;
    }
    if (!data || data.length === 0) {
      return <div>No hay datos para mostrar</div>;
    }

    // Filtrar elementos input=false y input=true
    const nonInputItems = data.filter(
      (item) => !item.input && item.tipo !== "img"
    );

    const inputItems = data.filter((item) => item.input);
    // console.log("datos INPUT: ", inputItems);

    const imgItems = data.filter((item) => item.tipo === "img");

    return (
      <>
        <div className="data-updater-container">
          <div className="data-updater-title">
            <h3>{type.toUpperCase().slice(0, -1)}</h3>
          </div>

          <div className="data-updater-inputs">
            {id && (
              <div className="data-updater-input-row">
                <div className="data-updater-content">
                  <label className="data-updater-label">
                    <strong>ID: </strong> {id}
                  </label>
                </div>

                {/* Renderizar elementos input=false en una fila */}

                {nonInputItems.map((item, index) => (
                  <div key={index} className="data-updater-item">
                    <div className="data-updater-content">
                      <label className="data-updater-label">
                        <strong>{item.nombre} :</strong> {item.contenido}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* IMAGEN */}
            {/* Renderizar elementos tipo img */}
            {imgItems.map((item, index) => (
              <>
                <div key={index} className="data-updater-item">
                  <div className="data-updater-content-img">
                    <div className="data-updater-image-container">
                      <img
                        src={
                          file
                            ? preview
                            : item.contenido
                            ? imgPath + item.contenido
                            : camera
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
                </div>
              </>
            ))}
          </div>
          <div className="data-updater-input-row-i">
            {/* Renderizar elementos input=true en otra fila */}
            {inputItems.map((item, index) => (
              <div key={index} className="data-updater-item-i">
                <Input
                  type={item.tipo}
                  value={
                    inputData[
                      item.nombre
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "_")
                        .toLowerCase()
                    ]
                  }
                  onChange={(e) =>
                    handleInputChange(item.nombre, e.target.value)
                  }
                  placeholder={item.nombre}
                  className="data-updater-input"
                />
              </div>
            ))}
          </div>
          <span
            style={{
              color: "var(--textlight)",
              fontSize: "var(--parr2)",
            }}
          >
            {mesajeError}
          </span>
          <button className="data-updater-button" onClick={handleUpdateData}>
            {btnCont ? btnCont : "ACTUALIZAR DATOS"}
          </button>

          {responsables.length > 0 && (
            <div className="responsable-table">
              <h2>RESPONSABLES</h2>
              <EditableTable
                data={responsables}
                updateUrl={"https://nourish-net-api.onrender.com/api/edit/editResponsable"}
                deleteURL={"https://nourish-net-api.onrender.com/api/edit/deleteResponsable"}
                addURL={"https://nourish-net-api.onrender.com/api/edit/addResponsable"}
                onSaveSuccess={fetchResp}
                idnuev={id}
                btn={true}
                nomBtn={"AGREGAR RESPONSABLE"}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  return <div>{renderInputs()}</div>;
};

export default DataUpdater;
