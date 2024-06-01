import axios from "axios";

const fetchUserData = async (searchFiltersData) => {
  // console.log(JSON.stringify(searchFiltersData));
  if (searchFiltersData.firstSelectValue === "voluntarios") {
    try {
      const response = await axios.get(
        "https://nourish-net-api.onrender.com/api/reports/get-volunteers",
        {
          params: {
            buscar: searchFiltersData.buscar || "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else if (searchFiltersData.firstSelectValue === "administradores") {
    try {
      const response = await axios.get(
        "https://nourish-net-api.onrender.com/api/reports/get-admins",
        {
          params: {
            buscar: searchFiltersData.buscar || "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else if (searchFiltersData.firstSelectValue === "donadores") {
    try {
      const response = await axios.get(
        "https://nourish-net-api.onrender.com/api/reports/get-donors",
        {
          params: {
            secondSelectValue: searchFiltersData.secondSelectValue || "",
            buscar: searchFiltersData.buscar || "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else if (searchFiltersData.firstSelectValue === "receptores") {
    try {
      const response = await axios.get(
        "https://nourish-net-api.onrender.com/api/reports/get-receiver",
        {
          params: {
            secondSelectValue: searchFiltersData.secondSelectValue || "",
            buscar: searchFiltersData.buscar || "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else {
    try {
      const response = await axios.get(
        "https://nourish-net-api.onrender.com/api/reports/get-users",
        {
          params: {
            secondSelectValue: searchFiltersData.secondSelectValue || "",
            buscar: searchFiltersData.buscar || "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
};

const fetchFoodData = async (searchFiltersData) => {
  console.log(JSON.stringify(searchFiltersData));
  try {
    const response = await axios.get(
      "https://nourish-net-api.onrender.com/api/reports/get-food",
      {
        params: {
          firstSelectValue: searchFiltersData.firstSelectValue || "",
          secondSelectValue: searchFiltersData.secondSelectValue || "",
          fechaInicial: searchFiltersData.fechaInicial || "",
          fechaFinal: searchFiltersData.fechaFinal || "",
          buscar: searchFiltersData.buscar || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const fetchDonationsData = async (searchFiltersData) => {
  console.log(JSON.stringify(searchFiltersData));
  try {
    const response = await axios.get(
      "https://nourish-net-api.onrender.com/api/reports/get-donations",
      {
        params: {
          firstSelectValue: searchFiltersData.firstSelectValue || "",
          secondSelectValue: searchFiltersData.secondSelectValue || "",
          buscar: searchFiltersData.buscar || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// EDITAR:
const fetchUserAdmin = async () => {
  try {
    const response = await axios.get(
      "https://nourish-net-api.onrender.com/api/edit/getAdmins"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

//PRODUCTOS
const foodData = async (id) => {
  try {
    const response = await axios.get(
      "https://nourish-net-api.onrender.com/api/edit/getFoodx",
      {
        params: {
          id: id,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const convertirFecha = (fecha) => {
  const fechaOriginal = new Date(fecha);
  const anio = fechaOriginal.getFullYear();
  const mes = String(fechaOriginal.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaOriginal.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
};

// const deleteFood = async (id) => {
//   try {
//     const response = await axios.get(
//       "https://nourish-net-api.onrender.com/api/edit/dete",
//       {
//         params: {
//           id: id,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

//USER
const userDatax = async (id) => {
  try {
    const response = await axios.get(
      "https://nourish-net-api.onrender.com/api/edit/getUserx",
      {
        params: {
          id: id,
        },
      }
    );
    let res;
    const dataRes = response.data;
    if (response.data.isAdmin) {
      res = [
        {
          nombre: "Perfil",
          contenido: dataRes.img_perfil,
          tipo: "img",
          input: false,
        },
        {
          nombre: "Correo",
          contenido: dataRes.correo,
          tipo: "",
          input: false,
        },
        {
          nombre: "Nombre",
          contenido: dataRes.nombre,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Apellido Paterno",
          contenido: dataRes.apellido_pat,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Apellido Materno",
          contenido: dataRes.apellido_mat,
          tipo: "text",
          input: true,
        },
      ];
    } else if (response.data.isVoluntario || response.data.isPersona) {
      res = [
        {
          nombre: "Perfil",
          contenido: dataRes.img_perfil,
          tipo: "img",
          input: false,
        },
        {
          nombre: "Correo",
          contenido: dataRes.correo,
          tipo: "",
          input: false,
        },
        {
          nombre: "Nombre",
          contenido: dataRes.nombre,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Apellido Paterno",
          contenido: dataRes.apellido_pat,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Apellido Materno",
          contenido: dataRes.apellido_mat,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Fecha nacimiento",
          contenido: convertirFecha(dataRes.fechanaci),
          tipo: "date",
          input: true,
        },
        {
          nombre: "Dirección",
          contenido: dataRes.direccion,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Teléfono",
          contenido: dataRes.telefono,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Celular",
          contenido: dataRes.celular,
          tipo: "text",
          input: true,
        },
      ];
    } else {
      res = [
        {
          nombre: "Perfil",
          contenido: dataRes.img_perfil,
          tipo: "img",
          input: false,
        },
        {
          nombre: "Correo",
          contenido: dataRes.correo,
          tipo: "",
          input: false,
        },
        {
          nombre: "Nombre",
          contenido: dataRes.nombre,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Tipo Entidad",
          contenido: dataRes.tipo_entidad,
          tipo: "select",
          input: true,
        },
        {
          nombre: "Dirección",
          contenido: dataRes.direccion,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Teléfono",
          contenido: dataRes.telefono,
          tipo: "text",
          input: true,
        },
        {
          nombre: "Celular",
          contenido: dataRes.celular,
          tipo: "text",
          input: true,
        },
      ];
    }

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export {
  fetchUserData,
  fetchFoodData,
  fetchDonationsData,
  fetchUserAdmin,
  foodData,
  userDatax,
};
