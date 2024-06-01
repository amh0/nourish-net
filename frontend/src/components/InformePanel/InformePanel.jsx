import { ChartPieSlice, Table, ArrowLeft } from "phosphor-react";
import React, { useEffect, useState } from "react";
import "./InformePanel.css";
import SearchFilters from "../SearchFilters/SearchFilters";
import TableReport from "../tableReport/TableReport";
import PieChartReport from "../pieChartReport/PieChartReport";
import {
  fetchUserData,
  fetchFoodData,
  fetchDonationsData,
  fetchUserAdmin,
  foodData,
  userDatax,
  deleteFood,
} from "./dbQueries";
import EditableTable from "../editableTable/EditableTable";
import { UpdateModeEnum } from "chart.js";
import UpdateUser from "../updateUser/UpdateUser";
import DataUpdater from "../dataUpdater/DataUpdater";

const InformePanel = ({ userType }) => {
  const [reportType, setReportType] = useState("tabla");
  const [selectedOption, setSelectedOption] = useState("Administradores");
  const [activeButton, setActiveButton] = useState(0);
  const [searchFiltersData, setSearchFiltersData] = useState({});
  const [userData, setUserData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [URLupdate, setURLupdate] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [dataEdit, setDataEdit] = useState([]);

  const handleChangeOption = (option) => {
    setSelectedOption(option);
  };

  const reportOptions = [
    {
      type: "tabla",
      icon: <Table size={44} color="var(--background0)" weight="thin" />,
      label: "Tabla",
    },
    {
      type: "gráfica de pastel",
      icon: (
        <ChartPieSlice size={44} color="var(--background0)" weight="thin" />
      ),
      label: "Pastel",
    },
  ];

  //EDITAR
  const fetchDataAdmins = async () => {
    const data = await fetchUserAdmin();

    const newData = data.map((item) => ({
      idadmin: item.idadmin,
      NOMBRE: item.nombre,
      "APELLIDO PATERNO": item.apellido_pat,
      "APELLIDO MATERNO": item.apellido_mat,
    }));

    setUserData(newData);
  };

  const convertirFecha = (fecha) => {
    const fechaOriginal = new Date(fecha);
    const anio = fechaOriginal.getFullYear();
    const mes = String(fechaOriginal.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaOriginal.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };

  // ELIMINAR

  //MOSTRAR
  const fetchDataUser = async () => {
    const data = await fetchUserData(searchFiltersData);
    setUserData(data);
  };

  const fetchDataFood = async () => {
    const data = await fetchFoodData(searchFiltersData);
    setUserData(data);
  };

  const fetchDataDonations = async () => {
    const data = await fetchDonationsData(searchFiltersData);
    setUserData(data);
  };

  useEffect(() => {
    setUserData([]);
    setSearchFiltersData({});
    setShowUpdate(false);
  }, [userType, reportType]);

  useEffect(() => {
    if (reportType === "tabla" && userType === "Usuarios") {
      fetchDataUser();
    } else if (reportType === "tabla" && userType === "Alimentos") {
      fetchDataFood();
    } else if (reportType === "tabla" && userType === "Donaciones") {
      fetchDataDonations();
    }
  }, [reportType, userType, searchFiltersData, showUpdate, showConfirmation]);

  const handleRowButtonClick = async (id, actionType) => {
    console.log(actionType, id, userType);
    setDataEdit([]);
    if (actionType === "editar") {
      setShowUpdate(true);
      setSelectedUserId(id);
      if (userType === "Alimentos") {
        const data = await foodData(id);

        const newData = data.map((item) => [
          {
            nombre: "Estado",
            contenido: item.estado,
            tipo: "",
            input: false,
          },
          {
            nombre: "Cantidad disponible",
            contenido: item.cantidad_disponible,
            tipo: "",
            input: false,
          },
          {
            nombre: "Cantidad reservada",
            contenido: item.cantidad_reservada,
            tipo: "",
            input: false,
          },
          {
            nombre: "Cantidad ya donada",
            contenido: item.cantidad_no_disponible,
            tipo: "",
            input: false,
          },
          {
            nombre: "Imagen",
            contenido: item.imagen,
            tipo: "img",
            input: false,
          },
          {
            nombre: "Nombre",
            contenido: item.nombre,
            tipo: "text",
            input: true,
          },
          {
            nombre: "Descripción",
            contenido: item.descripcion,
            tipo: "text",
            input: true,
          },
          {
            nombre: "Fecha vencimiento",
            contenido: convertirFecha(item.fecha_vencimiento),
            tipo: "date",
            input: true,
          },
          {
            nombre: "Unidad de medida",
            contenido: item.unidad_medida,
            tipo: "text",
            input: true,
          },
        ]);

        setDataEdit(newData[0]);
        setURLupdate("https://nourish-net-api.onrender.com/api/edit/editFood");
      } else if (userType === "Usuarios") {
        const data = await userDatax(id);
        setDataEdit(data);
        setURLupdate("https://nourish-net-api.onrender.com/api/edit/editUser");
      }
    } else if (actionType === "eliminar") {
      setShowConfirmation(true);
      setSelectedUserId(id);
    }
  };

  const renderReport = () => {
    switch (reportType) {
      case "tabla":
        return (
          <TableReport
            tableData={userData}
            // onRowButtonClick={handleRowButtonClick}
            onRowButtonClick={
              userType !== "Donaciones" ? handleRowButtonClick : null
            }
          />
        );
      case "gráfica de pastel":
        return <PieChartReport userType={userType} />;
      default:
        return null;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addAdmin = () => {
    setShowAdd(true);
    const newData = [
      {
        nombre: "img_perfil",
        contenido: "",
        tipo: "img",
        input: false,
      },
      {
        nombre: "Correo",
        contenido: "",
        tipo: "email",
        input: true,
      },
      {
        nombre: "Contraseña",
        contenido: "",
        tipo: "password",
        input: true,
      },
      {
        nombre: "Nombre",
        contenido: "",
        tipo: "text",
        input: true,
      },
      {
        nombre: "Apellido paterno",
        contenido: "",
        tipo: "text",
        input: true,
      },
      {
        nombre: "Apellido materno",
        contenido: "",
        tipo: "text",
        input: true,
      },
    ];

    setDataEdit(newData);
  };

  useEffect(() => {
    if (showUpdate) {
      scrollToTop();
    }
  }, [showUpdate]);

  const handleSearchFiltersData = (data) => {
    setSearchFiltersData(data);
    // alert(JSON.stringify(data));
  };

  const handleGenerateReport = (type, buttonId) => {
    setReportType(type);
    setActiveButton(buttonId);
  };

  return (
    <>
      {!showAdd ? (
        <div>
          {showUpdate ? (
            <div>
              <button
                onClick={() => setShowUpdate(false)}
                className="back-button-informe"
              >
                {" "}
                <ArrowLeft size={44} color="#222222" weight="thin" />
                Atrás
              </button>
              <DataUpdater
                type={userType}
                id={selectedUserId}
                data={dataEdit}
                URLedit={URLupdate}
                updateShow={setShowUpdate}
              />
            </div>
          ) : (
            <div>
              <div className="option-report-informe">
                <h2>{userType.toUpperCase()}</h2>
                <p>Selecciona una opción para generar el informe:</p>
                <div className="buttons-container">
                  {reportOptions.map((option, index) => (
                    <button
                      key={index}
                      style={{
                        backgroundColor:
                          activeButton === index
                            ? "var(--secondarylight)"
                            : "var(--secondary)",
                      }}
                      onClick={() => {
                        handleGenerateReport(option.type, index);
                      }}
                    >
                      {option.icon} {option.label}
                    </button>
                  ))}
                </div>
              </div>
              {reportType === "tabla" && (
                <SearchFilters
                  userType={userType}
                  onSearchFiltersData={handleSearchFiltersData}
                />
              )}
              {userType === "Usuarios" && reportType === "tabla" && (
                <div className="container-button-add">
                  <button
                    className="button-add-admin"
                    onClick={() => addAdmin()}
                  >
                    {/* <Plus size={30} color="var(--background0)" weight="thin" /> */}
                    Agregar Administrador
                  </button>
                </div>
              )}

              {renderReport()}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowAdd(false)}
            className="back-button-informe"
          >
            {" "}
            <ArrowLeft size={44} color="#222222" weight="thin" />
            Atrás
          </button>
          <DataUpdater
            type={"Agregar Administrador."}
            id={""}
            data={dataEdit}
            URLedit={"https://nourish-net-api.onrender.com/api/auth/addAdmin"}
            updateShow={setShowAdd}
            btnCont={"AGREGAR"}
          />
        </div>
      )}
    </>
  );
};

export default InformePanel;
