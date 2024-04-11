import axios from "axios";

const fetchUserData = async (searchFiltersData) => {
  // console.log(JSON.stringify(searchFiltersData));
  if (searchFiltersData.firstSelectValue === "voluntarios") {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/reports/get-volunteers",
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
        "http://localhost:3001/api/reports/get-admins",
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
        "http://localhost:3001/api/reports/get-donors",
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
        "http://localhost:3001/api/reports/get-receiver",
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
        "http://localhost:3001/api/reports/get-users",
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
      "http://localhost:3001/api/reports/get-food",
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
      "http://localhost:3001/api/reports/get-donations",
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

export { fetchUserData, fetchFoodData, fetchDonationsData };
