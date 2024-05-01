import React from "react";
import moment from "moment";
import "moment/locale/es";
import "./Peticion.css";
import { Heart, MapPin, Phone } from "phosphor-react";
import perfil from "../assets/perfil.jpg";
import { Link } from "react-router-dom";

const imgPath = "http://localhost:3001/img/";

const Peticion = ({ post }) => {
  const imgPath = "http://localhost:3001/img/";
  const tiempoTranscurrido = moment(post.fecha_publicacion).fromNow();

  const getPriorityClass = (priority) => {
    let priorityClass = "";
    switch (priority) {
      case "Urgente":
        priorityClass = "urgent";
        break;
      case "Alta":
        priorityClass = "high";
        break;
      case "Media":
        priorityClass = "medium";
        break;
      case "Baja":
        priorityClass = "low";
        break;
      case "Permanente/Continua":
        priorityClass = "permanent";
        break;
      default:
        break;
    }
    return priorityClass;
  };

  const priorityClass = getPriorityClass(post.prioridad);

  return (
    <div className="peti-cont">
      <div className="peticion">
        <div className="peticion-container">
          <div className="user">
            <div className="userInfo">
              <img
                src={post.img_perfil ? imgPath + post.img_perfil : perfil}
                alt=""
              />
              <div className="details">
                {/* <Link
                  to={`/perfil/${post.idusuario}`}
                  style={{ textDecoration: "none", color: "var(--text)" }}
                > */}
                <span className="name">{post.nombre}</span>
                {/* </Link> */}
                <span className="date">{tiempoTranscurrido}</span>
              </div>
            </div>
            <span className={priorityClass}>{post.prioridad}</span>
          </div>
          <div className="content">
            <p className="title">
              <span className={priorityClass}>{post.prioridad}</span>{" "}
              {post.titulo}
            </p>

            <div className="content-section">
              <div className="ubication">
                <MapPin size={20} color="var(--textlight)" weight="thin" />
                <p>{post.ubicacion}</p>
              </div>
              <div className="ubication">
                <Phone size={20} color="var(--textlight)" weight="thin" />
                <p>{post.contacto}</p>
              </div>
            </div>

            <p className="description">{post.descripcion}</p>
            {post.imagen && <img src={imgPath + post.imagen} alt=""></img>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peticion;
