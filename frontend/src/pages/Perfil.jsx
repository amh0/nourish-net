import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import "./css/Perfil.css";
import axios from "axios";
import perfil from "../components/assets/perfil.jpg";
import { HandHeart, Package, Megaphone } from "@phosphor-icons/react";
import AnalysisSection from "../components/analysisSection/AnalysisSection";
import UpdateUser from "../components/updateUser/UpdateUser";
import { MapPin, Phone } from "phosphor-react";
import EditableTable from "../components/editableTable/EditableTable";

const Perfil = () => {
  const imgPath = "http://localhost:3001/img/";
  const [selectedOption, setSelectedOption] = useState("Donaciones realizadas");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [nroData, setNroData] = useState([]);
  const [responsables, setResponsables] = useState([]);

  const handleChangeOption = (option) => {
    setSelectedOption(option);
  };

  const { logout, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (currentUser.isOrganization) {
      fetchResp();
    }
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3001/api/reports/get-nro-publ-rec-pet",
        {
          params: {
            iduser: currentUser.idusuario || "",
          },
        }
      );
      setNroData(result.data[0]);
    } catch (err) {
      console.log("Error obteniendo productos");
      console.log(err);
    }
  };

  const fetchResp = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3001/api/user/responsables",
        {
          params: {
            idOrg: currentUser.idusuario || "",
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

  return (
    <div className="perfil">
      <div className="perfil-container">
        <header>
          <div className="perfil-header">
            <div className="perfil-image-container">
              <img
                src={
                  currentUser.img_perfil
                    ? imgPath + currentUser.img_perfil
                    : perfil
                }
                alt="Profile"
                className="perfil-image"
              />
            </div>
            <div className="perfil-info">
              <h2 className="perfil-name">
                {currentUser.nombre +
                  " " +
                  (currentUser.apellido_pat || "") +
                  " " +
                  (currentUser.apellido_mat || "")}
              </h2>
              <p className="perfil-email">{currentUser.correo}</p>
              {currentUser.isOrganization && (
                <p className="perfil-email">{currentUser.tipo_entidad}</p>
              )}
              {!currentUser.isAdmin ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MapPin size={20} color="var(--textlight)" weight="thin" />
                    <p className="perfil-email">{currentUser.direccion}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Phone size={20} color="var(--textlight)" weight="thin" />
                    <p className="perfil-email">{currentUser.celular}</p>
                  </div>
                </div>
              ) : (
                <p className="perfil-email">ADMINISTRADOR</p>
              )}
            </div>
          </div>
          <div className="perfil-actions">
            <button className="edit-button" onClick={() => setOpenUpdate(true)}>
              Editar perfil
            </button>
            <button onClick={handleLogout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        </header>
        {currentUser.isOrganization && (
          <div>
            <h2>RESPONSABLES</h2>
            <EditableTable
              data={responsables}
              updateUrl={"http://localhost:3001/api/edit/editResponsable"}
              deleteURL={"http://localhost:3001/api/edit/deleteResponsable"}
              addURL={"http://localhost:3001/api/edit/addResponsable"}
              onSaveSuccess={fetchResp}
              idnuev={currentUser.idusuario}
              btn={true}
              nomBtn={"AGREGAR RESPONSABLE"}
            />
          </div>
        )}

        {!currentUser.isAdmin && (
          <div>
            <section className="perfil-stats">
              <div className="stat-item">
                <HandHeart size={70} color="#222222" weight="thin" />
                <div>
                  <p className="stat-label">Donaciones realizadas:</p>
                  <p className="stat-value">
                    {nroData.alimentos_publicados || 0}
                  </p>
                </div>
              </div>
              <div className="stat-item">
                <Package size={70} color="#222222" weight="thin" />
                <div>
                  <p className="stat-label">Donaciones recibidas:</p>
                  <p className="stat-value">
                    {nroData.alimentos_recibidos || 0}
                  </p>
                </div>
              </div>
              <div className="stat-item">
                <Megaphone size={70} color="#222222" weight="thin" />
                <div>
                  <p className="stat-label">Peticiones realizadas:</p>
                  <p className="stat-value">{nroData.nro_peticiones || 0}</p>
                </div>
              </div>
            </section>
            <div className="perfil-menu">
              <ul className="nav-menu-perfil">
                <li onClick={() => handleChangeOption("Donaciones realizadas")}>
                  Donaciones realizadas
                  {selectedOption === "Donaciones realizadas" ? <hr /> : <></>}
                </li>
                <li onClick={() => handleChangeOption("Donaciones recibidas")}>
                  Donaciones recibidas
                  {selectedOption === "Donaciones recibidas" ? <hr /> : <></>}
                </li>
                {!currentUser.isOrganization && (
                  <li onClick={() => handleChangeOption("Entregas")}>
                    Actividades de Voluntariado
                    {selectedOption === "Entregas" ? <hr /> : <></>}
                  </li>
                )}
              </ul>
            </div>

            {selectedOption === "Donaciones realizadas" && (
              <div className="div-analisis">
                <AnalysisSection
                  tablesData={[
                    "ALIMENTOS DONADOS",
                    {
                      title: "Alimetos Donados",
                      databaseQuery:
                        "http://localhost:3001/api/reports/get-donations-user",
                    },
                  ]}
                  chartsData={[
                    {
                      title: "Alimentos por categoria",
                      activateButtons: false,
                      databaseQuery: [
                        "http://localhost:3001/api/reports/get-donations-category",
                      ],
                    },
                    {
                      title: `Alimentos donados por Meses - ${new Date().getFullYear()}`,
                      activateButtons: true,
                      databaseQuery: [
                        "http://localhost:3001/api/reports/get-donations-month",
                      ],
                    },
                  ]}
                  iduser={currentUser.idusuario}
                />
              </div>
            )}
            {selectedOption === "Donaciones recibidas" && (
              <div>
                <AnalysisSection
                  tablesData={[
                    "DONACIONES RECIBIDAS",
                    {
                      title: "Alimetos Recibidos",
                      databaseQuery:
                        "http://localhost:3001/api/reports/get-donations-received",
                    },
                  ]}
                  chartsData={[
                    {
                      title: `Alimentos recibidos por Meses - ${new Date().getFullYear()}`,
                      activateButtons: true,
                      databaseQuery: [
                        "http://localhost:3001/api/reports/get-donations-received-month",
                      ],
                    },
                  ]}
                  iduser={currentUser.idusuario}
                />
              </div>
            )}
            {selectedOption === "Entregas" && (
              <div>
                <AnalysisSection
                  tablesData={[
                    "DONACIONES ENTREGADAS",
                    {
                      title: "Alimetos Entregados",
                      databaseQuery:
                        "http://localhost:3001/api/reports/get-donations-volunteer",
                    },
                  ]}
                  chartsData={[
                    {
                      title: `Alimentos entregados por Meses - ${new Date().getFullYear()}`,
                      activateButtons: true,
                      databaseQuery: [
                        "http://localhost:3001/api/reports/get-donations-volunteer-month",
                      ],
                    },
                  ]}
                  iduser={currentUser.idusuario}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {openUpdate && <UpdateUser setOpenUpdate={setOpenUpdate} />}
    </div>
  );
};

export default Perfil;
