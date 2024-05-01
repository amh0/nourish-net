import { db } from "../connect.js";
import jwt from "jsonwebtoken";

const updateUserAndTokenData = (db, query, updateValues, res) => {
  db.query(query, updateValues, (err, data) => {
    if (err) {
      console.log("Error:", err);
    }
  });
};

export const updateUser = async (req, res) => {
  const imagen = req.file ? req.file.filename : null;

  const token = req.cookies.accessToken;
  // console.log(token);

  if (!token) return res.status(401).json("Not authenticated!");
  const tokenData = JSON.parse(req.body.token);

  let newTokenData = {
    ...tokenData,
  };

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (imagen) {
      const qUser = "UPDATE usuario SET `img_perfil` = ? WHERE idusuario = ?";
      const updateValues = [imagen, userInfo.idusuario];
      updateUserAndTokenData(db, qUser, updateValues, res);
      newTokenData = {
        ...newTokenData,
        img_perfil: imagen,
      };
    }

    if (tokenData.isAdmin) {
      const q =
        "UPDATE admin SET `nombre` = ?, `apellido_pat` = ?, `apellido_mat` = ? WHERE idadmin = ?";
      const updateAdminValues = [
        req.body.nombre,
        req.body.apellido_pat,
        req.body.apellido_mat,
        userInfo.idusuario,
      ];
      updateUserAndTokenData(db, q, updateAdminValues, res);

      newTokenData = {
        ...newTokenData,
        nombre: req.body.nombre,
        apellido_pat: req.body.apellido_pat,
        apellido_mat: req.body.apellido_mat,
      };
    }

    if (tokenData.isOrganization) {
      const q =
        "UPDATE organizacion SET `nombre` = ?, `tipo_entidad` = ?, `direccion` = ?, `telefono` = ?, `celular` = ?  WHERE idorg = ?";
      const updateValues = [
        req.body.nombre,
        req.body.tipo_entidad,
        req.body.direccion,
        req.body.telefono,
        req.body.celular,
        userInfo.idusuario,
      ];
      updateUserAndTokenData(db, q, updateValues, res);

      const newTokenData = {
        ...newTokenData,
        nombre: req.body.nombre,
        apellido_pat: req.body.apellido_pat,
        apellido_mat: req.body.apellido_mat,
        fechanaci: fechaFormateada,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        celular: req.body.celular,
      };
    } else {
      const fechaNacimiento = new Date(req.body.fechanaci);
      if (isNaN(fechaNacimiento.getTime())) {
        return res.status(400).json("Fecha de nacimiento inválida.");
      }

      const fechaFormateada = fechaNacimiento.toISOString().split("T")[0];
      const qPer =
        "UPDATE persona SET `nombre` = ?, `apellido_pat` = ?, `apellido_mat` = ?, `fechanaci` = ?, `direccion` = ?, `telefono` = ?, `celular` = ? WHERE idpersona = ?";

      const updateValuesPer = [
        req.body.nombre,
        req.body.apellido_pat,
        req.body.apellido_mat,
        fechaFormateada,
        req.body.direccion,
        req.body.telefono,
        req.body.celular,
        userInfo.idusuario,
      ];

      updateUserAndTokenData(db, qPer, updateValuesPer, res);

      const qVol =
        "UPDATE voluntario SET `nombre` = ?, `apellido_pat` = ?, `apellido_mat` = ?, `fechanaci` = ?, `direccion` = ?, `telefono` = ?, `celular` = ? WHERE idvoluntario = ?";

      const updateValuesVol = [
        req.body.nombre,
        req.body.apellido_pat,
        req.body.apellido_mat,
        fechaFormateada,
        req.body.direccion,
        req.body.telefono,
        req.body.celular,
        userInfo.idusuario,
      ];

      updateUserAndTokenData(db, qVol, updateValuesVol, res);

      newTokenData = {
        ...newTokenData,
        nombre: req.body.nombre,
        tipo_entidad: req.body.tipo_entidad,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        celular: req.body.celular,
      };
    }

    // console.log("==================================");
    // console.log(newTokenData);
    return res.json({ message: "Update successful!", newTokenData });
  });
};

export const getResponsables = (req, res) => {
  const { idOrg } = req.query;
  const sql = `SELECT *
                FROM responsable 
                WHERE idorg like '${idOrg}';`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      res.json(results);
    }
  });
};
