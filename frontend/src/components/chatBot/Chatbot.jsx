import React, { useState, useEffect, useContext, useRef } from "react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";
import botAvatar from "../assets/botAvatar3.png";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "../../context/authContext";
import Nosotros from "../../pages/Nosotros";
import Contacto from "../../pages/Contacto";
import Faq from "../../pages/Faq";
import Login from "../../pages/Login";
import LoginForm from "../login-form/LoginForm";
import Signup from "../../pages/Signup";
import { Link } from "react-router-dom";

const ChatbotComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState(currentUser ? currentUser.nombre : "");
  const [chatKey, setChatKey] = useState(Date.now());
  const apiPath = "https://nourish-net-api.onrender.com/api";

  const userInputRef = useRef("");

  const handleUserInput = (value) => {
    userInputRef.current = value.value;
  };

  useEffect(() => {
    if (currentUser && currentUser.nombre) {
      setNombre(currentUser.nombre);
    }
    setChatKey(Date.now());
  }, [currentUser]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          apiPath + "/chatbot/get-all-categories"
        );
        const response1 = await axios.get(apiPath + "/chatbot/get-all-food");
        const response2 = await axios.get(apiPath + "/chatbot/get-categoryx");
        setFoodData(response1.data);
        setCategories(response.data);
        setFoodCategoryData(response2.data);
        console.log(response2.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const TableChatBot = ({ datos }) => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((dato) => (
          <tr key={dato.idcategoria}>
            <td>{dato.idcategoria}</td>
            <td>{dato.nombre_cat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const TableChatBotAlimentos = ({ datos, filterFood }) => {
    const filterValue = filterFood ? filterFood.current.toLowerCase() : "";
    const datosFiltrados = datos.filter(
      (dato) =>
        dato.evaluacion !== "No evaluado" &&
        dato.cantidad_disponible > 0 &&
        dato.nombre.toLowerCase().includes(filterValue)
      // (!filtroNombre ||
      //   dato.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
    );

    return (
      <div className="table-container-chatbot">
        {datosFiltrados && datosFiltrados.length > 0 ? (
          <table className="table-chatbot">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Nombre</th>
                <th style={{ textAlign: "left" }}>Cant. Disp.</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((dato) => (
                <tr key={dato.idalimento}>
                  <td>
                    {" "}
                    <Link className="link" to={`/producto/${dato.idalimento}`}>
                      {dato.nombre}
                    </Link>
                  </td>
                  <td>{dato.cantidad_disponible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="3">No hay datos disponibles</td>
          </tr>
        )}
      </div>
    );
  };

  const TableAlimCategoriax = ({ datos, filter }) => {
    const datosFiltrados = datos.filter((dato) =>
      dato.nombre_cat.toLowerCase().includes(filter.current.toLowerCase())
    );

    return (
      <div className="table-container-chatbot">
        {datosFiltrados && datosFiltrados.length > 0 ? (
          <table className="table-chatbot">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}> Nombre</th>
                <th style={{ textAlign: "left" }}>Cant. Disp.</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr key={dato.idalimento}>
                  <td>{dato.nombre}</td>
                  <td>{dato.cantidad_disponible}</td>
                </tr> */}
              {datosFiltrados.map((dato) => (
                <tr key={dato.idalimento}>
                  <td>
                    <Link className="link" to={`/producto/${dato.idalimento}`}>
                      {dato.nombre}
                    </Link>
                  </td>
                  <td>{dato.cantidad_disponible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="3">No hay datos disponibles</td>
          </tr>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div>Cargando aliemntos...</div>;
  }

  const steps = [
    {
      id: "1",
      message: nombre
        ? `¡Hola ${nombre}!, Bienvenido a Nourish Net ¿En qué puedo ayudarte?`
        : "¡Hola, Bienvenido a Nourish Net! ¿Cuál es tu nombre?",
      trigger: nombre ? "options" : "1a",
    },
    {
      id: "1a",
      user: true,
      trigger: ({ value }) => {
        setNombre(value);
        return "2";
      },
    },
    {
      id: "2",
      message: ({ previousValue }) => {
        setNombre(previousValue);
        return `${previousValue}, ¿En qué puedo ayudarte?`;
      },
      trigger: "options",
    },
    {
      id: "options",
      options: [
        {
          value: "nourishNet",
          label: "Nourish Net",
          trigger: "sobreNourishNet",
        },
        {
          value: "donar",
          label: "Donar",
          trigger: "donar",
        },
        {
          value: "recibir_donacion",
          label: "Recibir donación",
          trigger: "recibir_donacion_menu",
        },
        {
          value: "consultar_alimento",
          label: "Consultar un alimento específico",
          trigger: "consultar_alimento",
        },
        {
          value: "ver_categorias",
          label: "Ver categorías de alimentos",
          trigger: "ver_categorias",
        },
      ],
    },
    {
      id: "sobreNourishNet",
      message: "¿Qué quieres saber sobre Nourish Net?",
      trigger: "menuNourishnet",
    },
    {
      id: "menuNourishnet",
      options: [
        {
          value: "nosotrosNourishnet",
          label: "Nosotros",
          trigger: "nosotrosNourishnet",
        },
        {
          value: "contactoNourishnet",
          label: "Contacto",
          trigger: "contactoNourishnet",
        },
        {
          value: "faqNourishnet",
          label: "Preguntas frecuentes",
          trigger: "faqNourishnet",
        },
      ],
    },
    {
      id: "nosotrosNourishnet",
      component: <Nosotros />,
      trigger: "Menu",
    },
    {
      id: "contactoNourishnet",
      component: <Contacto />,
      trigger: "Menu",
    },
    {
      id: "faqNourishnet",
      component: <Faq />,
      trigger: "Menu",
    },
    {
      id: "ver_categorias",
      message: "Aquí tienes la lista de categorías de alimentos disponibles:",
      trigger: "mostrar_categorias",
    },
    {
      id: "donar",
      component: currentUser ? (
        <div>
          Para donar, puedes ingresar a{" "}
          <Link className="link" to={"/donar"}>
            DONAR
          </Link>{" "}
          y llena todos los campos que se te solicitan.
        </div>
      ) : (
        <div>Para donar, primero debes iniciar sesión o registrarte</div>
      ),
      trigger: currentUser ? "Menu" : "menuIniciarSesionRegistrar",
    },
    {
      id: "recibir_donacion_menu",
      message: "¿Qué desea hacer?",
      trigger: "recibir_donacion_options",
    },
    {
      id: "recibir_donacion_options",
      options: [
        {
          value: "ver_alimentos_disponibles",
          label: "Ver alimentos disponibles",
          trigger: "ver_alimentos",
        },
        {
          value: "como_recibir_donacion",
          label: "Cómo recibir una donación",
          trigger: "recibir_donacion",
        },
      ],
    },
    {
      id: "ver_alimentos",
      component: (
        <div>
          Si deseas ver los alimentos disponibles, ingresa a{" "}
          <Link className="link" to={"/alimentos"}>
            ALIMENTOS
          </Link>
          <TableChatBotAlimentos datos={foodData} />
        </div>
      ),
      trigger: "Menu",
    },

    {
      id: "recibir_donacion",
      component: currentUser ? (
        <>
          <div>
            Para recibir alguna donación puede ingresar a{" "}
            <Link className="link" to={"/alimentos"}>
              ALIMENTOS
            </Link>
          </div>
        </>
      ) : (
        <div>
          Para recibir alguna donación, primero debe iniciar sesión o
          registrarte
        </div>
      ),
      trigger: currentUser ? "Menu" : "menuIniciarSesionRegistrar",
    },
    {
      id: "consultar_alimento",
      message:
        "Ingrese el alimento que es de su interés para mostrar sugerencias.Ej: Arroz",
      trigger: "consultar_alimento_input",
    },
    {
      id: "consultar_alimento_input",
      user: true,
      trigger: (value) => {
        handleUserInput(value);
        return "consultar_alimento_result";
      },
      // trigger: "consultar_alimento_result",
    },
    {
      id: "consultar_alimento_result",
      message:
        "Aquí tienes las sugerencias de {previousValue}" +
        (currentUser
          ? ", para recibir alguna donación haga click en el nombre del alimeneto."
          : ""),
      trigger: "mostrarAlimentox",
    },
    {
      id: "mostrarAlimentox",
      component: (
        <TableChatBotAlimentos datos={foodData} filterFood={userInputRef} />
      ),
      trigger: "Menu",
    },
    {
      id: "registro",
      component: (
        <div>
          {/* //   style={{
        //     width: "130%",
        //     maxWidth: "600px",
        //     margin: "0 auto",
        //     padding: "0px",
        //   }}
        // >
        //   <Signup /> */}
          O puedes ingresa a{" "}
          <Link className="link" to={"/signup"}>
            REGISTRATE
          </Link>
          {/* <a
            href="http://localhost:3000/signup"
            target="_blank"
            rel="noopener noreferrer"
          ></a>*/}{" "}
          y llena todos los campos que se te solicitan.
        </div>
      ),

      trigger: "Menu",
    },
    {
      id: "iniciar_sesion",
      component: (
        <div
          style={{
            width: "130%",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0px",
          }}
        >
          <Login />
          {/* Si deseas iniciar sesión, ingresa a{" "}
          <a
            href="http://localhost:3000/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            INICIAR SESIÓN
          </a>{" "}
          y llena todos los campos que se te solicitan. */}
        </div>
      ),
      trigger: "Menu",
    },
    {
      id: "mostrar_categorias",
      component: <TableChatBot datos={categories} />,
      trigger: "menuCategoria",
    },
    {
      id: "menuCategoria",
      message: "¿Te gustaría ver alimentos de una categoría en específico?",
      trigger: "menuCategoriaOptions",
    },
    {
      id: "menuCategoriaOptions",
      options: [
        { value: "si", label: "Si", trigger: "siMostrarCatX" },
        { value: "no", label: "No", trigger: "Menu" },
      ],
    },
    {
      id: "siMostrarCatX",
      message: "Escribe el nombre de la categoria EJ: Lacteo",
      trigger: "obtenerCatx",
    },
    {
      id: "obtenerCatx",
      user: true,
      trigger: (value) => {
        handleUserInput(value);
        return "mostrarCatXMens";
      },
    },
    {
      id: "mostrarCatXMens",
      message: "Estos son todos los alimentos con la categoria {previousValue}",
      trigger: "mostrarCatX",
    },
    {
      id: "mostrarCatX",
      component: (
        <TableAlimCategoriax datos={foodCategoryData} filter={userInputRef} />
      ),
      trigger: "menuCategoria",
    },
    {
      id: "Menu",
      message: "¿Quieres realizar una nueva consulta?",
      trigger: "options",
    },
    {
      id: "menuGen",
      options: [
        { value: "si", label: "Si", trigger: "options" },
        {
          value: "no",
          label: "No",
        },
      ],
    },
    {
      id: "menuIniciarSesionRegistrar",
      options: [
        {
          value: "registrarse",
          label: "Registrarse",
          trigger: "registro",
        },
        {
          value: "iniciar_sesion",
          label: "Iniciar Sesión",
          trigger: "iniciar_sesion",
        },
      ],
    },
  ];

  if (!currentUser) {
    steps[3].options.push(
      { value: "registro", label: "Registrarse", trigger: "registro" },
      {
        value: "iniciar_sesion",
        label: "Iniciar sesión",
        trigger: "iniciar_sesion",
      }
    );
  }

  const theme = {
    background: "var(--background2)",
    headerBgColor: "var(--secondary)",
    headerFontColor: "#fff",
    headerFontSize: "var(parr1)",
    botBubbleColor: "var(--secondary)",
    botFontColor: "#fff",
    userBubbleColor: "var(--secondary_strong)",
    userFontColor: "var(--background0)",
  };

  return (
    <div className="chatbot-container">
      <ThemeProvider theme={theme}>
        <ChatBot
          key={chatKey}
          steps={steps}
          botMessage="¿En qué puedo ayudarte?"
          floating={true}
          floatingStyle={{
            bottom: "20px",
            right: "20px",
            width: "80px",
            height: "80px",
          }}
          floatingIcon={
            <img
              src={botAvatar}
              alt="Bot Avatar"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                background: "transparent",
                filter: "invert(100%) brightness(150%)",
              }}
            />
          }
        />
      </ThemeProvider>
    </div>
  );
};
export default ChatbotComponent;
