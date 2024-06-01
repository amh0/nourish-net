import React, { useEffect, useState } from "react";
import Peticion from "../components/peticion/Peticion";
import "./css/Peticiones.css";
import axios from "axios";
import RequestPosting from "../components/requestPosting/RequestPosting";

const Peticiones = () => {
  const imgPath = "https://nourish-net-api.onrender.com/img/";
  const [peticiones, setPeticiones] = useState([]);

  useEffect(() => {
    fetchData();
  }, [peticiones]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "https://nourish-net-api.onrender.com/api/peticiones/get-peticiones"
      );
      setPeticiones(result.data);
    } catch (err) {
      console.log("Error al mostrar las peticiones");
      console.log(err);
    }
  };

  const agregarPeticion = (nuevaPeticion) => {
    setPeticiones([...peticiones, nuevaPeticion]);
  };

  return (
    <div className="peticiones">
      <RequestPosting onPeticionAgregada={agregarPeticion} />
      {peticiones.map((peticion) => (
        <Peticion post={peticion} key={peticion.idpeticion} />
      ))}
    </div>
  );
};

export default Peticiones;
