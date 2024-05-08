import { db } from "../connect.js";

export const editResponsable = (req, res) => {
  const q =
    "UPDATE responsable SET `nombre` = ?, `apellido_pat` = ?, `apellido_mat` = ?, `direccion` = ?, `telefono` = ?, `celular` = ? WHERE idresp = ?";

  const updateValues = [
    req.body.NOMBRE,
    req.body["APELLIDO PAT"],
    req.body["APELLIDO MAT"],
    req.body.DIRECCION,
    req.body.TELEFONO,
    req.body.CELULAR,
    req.body.idResp,
  ];

  db.query(q, updateValues, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res
        .status(500)
        .json({ error: "Error al actualizar el responsable" });
    }
    res.status(200).json({ message: "Responsable actualizado correctamente" });
  });
};

export const deleteResponsable = (req, res) => {
  const id = req.query.id;
  //   console.log(id);

  const q = "DELETE FROM responsable WHERE idresp = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log("Error al eliminar el responsable:", err);
      return res
        .status(500)
        .json({ error: "Error al eliminar el responsable" });
    }
    res.status(200).json({ message: "Responsable eliminado correctamente" });
  });
};

export const addResponsable = (req, res) => {
  const {
    NOMBRE,
    "APELLIDO PAT": APELLIDO_PAT,
    "APELLIDO MAT": APELLIDO_MAT,
    DIRECCION,
    TELEFONO,
    CELULAR,
    id,
  } = req.body;
  const q =
    "INSERT INTO responsable (`nombre`, `apellido_pat`, `apellido_mat`, `direccion`, `telefono`, `celular`, `idorg`) VALUES (?, ?, ?, ?, ?, ?,?)";

  const insertValues = [
    NOMBRE || "",
    APELLIDO_PAT || "",
    APELLIDO_MAT || "",
    DIRECCION || "",
    TELEFONO || "",
    CELULAR || "",
    id || "",
  ];

  db.query(q, insertValues, (err, data) => {
    if (err) {
      console.log("Error al agregar el responsable:", err);
      return res.status(500).json({ error: "Error al agregar el responsable" });
    }
    res.status(200).json({ message: "Responsable agregado correctamente" });
  });
};

// ADMINISTRADORES
export const getAdmins = (req, res) => {
  const q = "SELECT * FROM admin";

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error al agregar el responsable:", err);
      return res.status(500).json({ error: "Error al agregar el responsable" });
    }
    res.status(200).json(data);
    // console.log(data);
  });
};

export const editAdmin = (req, res) => {
  // console.log(req.body);
  const q =
    "UPDATE admin SET `nombre` = ?, `apellido_pat` = ?, `apellido_mat` = ? WHERE idadmin = ?";

  const updateValues = [
    req.body.NOMBRE,
    req.body["APELLIDO PATERNO"],
    req.body["APELLIDO MATERNO"],
    req.body.idadmin,
  ];

  db.query(q, updateValues, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json({ error: "Error al actualizar el admin" });
    }
    res.status(200).json({ message: "Admin actualizado correctamente" });
  });
};

//ALIMENTOS
export const getFoodx = (req, res) => {
  const id = req.query.id;
  const q = "SELECT * FROM alimento WHERE idalimento = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log("Error al agregar el responsable:", err);
      return res.status(500).json({ error: "Error al agregar el responsable" });
    }
    res.status(200).json(data);
    // console.log(data);
  });
};

export const editFood = (req, res) => {
  let imagen = null;
  if (req.file) {
    imagen = req.file.filename;
  }

  const q =
    "UPDATE alimento SET `nombre` = ?, `descripcion` = ?, `fecha_vencimiento` = ?, `unidad_medida` = ?" +
    (imagen ? ", `imagen` = ?" : "") +
    " WHERE idalimento = ?";

  const updateValues = [
    req.body.nombre,
    req.body.descripcion,
    req.body.fecha_vencimiento,
    req.body.unidad_de_medida,
  ];

  if (imagen) {
    updateValues.push(imagen);
  }

  updateValues.push(req.body.id);

  db.query(q, updateValues, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json({ error: "Error al actualizar " });
    }
    // res.status(200).json({ message: "Actualizado correctamente" });
    res.status(200).json({ message: "ok" });
  });
};

// GET USUARIO
export const getUserx = (req, res) => {
  const id = req.query.id;

  const q = "SELECT * FROM usuario WHERE idusuario = ?";

  db.query(q, [id], (err, userData) => {
    if (err) {
      console.log("Error al obtener el usuario:", err);
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }

    if (userData.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let user = userData[0];
    let isAdmin = false;
    let isGeneral = false;
    let isVoluntario = false;
    let isPersona = false;
    let isOrganizacion = false;

    // Verificar si es admin
    const qAdmin = "SELECT * FROM admin WHERE idadmin = ?";
    db.query(qAdmin, [user.idusuario], (err, adminData) => {
      if (err) {
        console.log("Error al obtener el admin:", err);
        return res.status(500).json({ error: "Error al obtener el admin" });
      }
      if (adminData.length > 0) {
        isAdmin = true;
        user = {
          ...user,
          ...adminData[0],
        };
      }

      // Verificar si es voluntario y persona
      const qVoluntario = "SELECT * FROM voluntario WHERE idvoluntario = ?";
      db.query(qVoluntario, [user.idusuario], (err, voluntarioData) => {
        if (err) {
          console.log("Error al obtener el voluntario:", err);
          return res
            .status(500)
            .json({ error: "Error al obtener el voluntario" });
        }
        if (voluntarioData.length > 0) {
          isVoluntario = true;
          const { idvoluntario, turno, tarea, ubicacion, ...others } =
            voluntarioData[0];
          user = {
            ...user,
            ...others,
          };
        }

        // Verificar si es persona
        const qPersona = "SELECT * FROM persona WHERE idpersona = ?";
        db.query(qPersona, [user.idusuario], (err, personaData) => {
          if (err) {
            console.log("Error al obtener la persona:", err);
            return res
              .status(500)
              .json({ error: "Error al obtener la persona" });
          }
          if (personaData.length > 0) {
            isPersona = true;
            if (!isVoluntario) {
              const { idpersona, ubicaion, ...others } = personaData[0];
              user = {
                ...user,
                ...others,
              };
            }
          }

          // Verificar si es organización
          const qOrganizacion = "SELECT * FROM organizacion WHERE idorg = ?";
          db.query(qOrganizacion, [user.idusuario], (err, orgData) => {
            if (err) {
              console.log("Error al obtener la organización:", err);
              return res
                .status(500)
                .json({ error: "Error al obtener la organización" });
            }
            if (orgData.length > 0) {
              isOrganizacion = true;
              const { idorg, logo, ...others } = orgData[0];
              user = {
                ...user,
                ...others,
              };
            }

            user = {
              ...user,
              isAdmin,
              isVoluntario,
              isGeneral,
              isOrganizacion,
              isPersona,
            };
            return res.json(user);
          });
        });
      });
    });
  });
};

export const editUser = (req, res) => {
  let imagen = null;
  if (req.file) {
    imagen = req.file.filename;
  }
  // console.log(req.body);
  // console.log(imagen);

  if (imagen) {
    const qUser = "UPDATE usuario SET `img_perfil` = ? WHERE idusuario = ?";
    db.query(qUser, [imagen, req.body.id], (err, data) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ error: "Error al actualizar " });
      }
    });
  }
  //VERIFICAMOS SI ES ADMIN
  const qadmin =
    "UPDATE admin SET `nombre` = ? ,`apellido_pat` = ?, `apellido_mat` = ?  WHERE idadmin = ?";
  db.query(
    qadmin,
    [
      req.body.nombre,
      req.body.apellido_paterno,
      req.body.apellido_materno,
      req.body.id,
    ],
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ error: "Error al actualizar " });
      }
    }
  );

  //VERIFICAMOS SI ES VOLUNTARIO
  const qVol =
    "UPDATE voluntario SET `nombre` = ? ,`apellido_pat` = ?, `apellido_mat` = ?, `fechanaci` = ?, `direccion` = ?,`telefono` = ?, `celular` = ?  WHERE idvoluntario = ?";
  db.query(
    qVol,
    [
      req.body.nombre,
      req.body.apellido_paterno,
      req.body.apellido_materno,
      req.body.fecha_nacimiento,
      req.body.direccion,
      req.body.telefono,
      req.body.celular,
      req.body.id,
    ],
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ error: "Error al actualizar " });
      }
    }
  );

  //VERIFICAMOS SI ES PERSONA
  const qPers =
    "UPDATE persona SET `nombre` = ? ,`apellido_pat` = ?, `apellido_mat` = ?, `fechanaci` = ?, `direccion` = ?,`telefono` = ?, `celular` = ?  WHERE idpersona = ?";
  db.query(
    qPers,
    [
      req.body.nombre,
      req.body.apellido_paterno,
      req.body.apellido_materno,
      req.body.fecha_nacimiento,
      req.body.direccion,
      req.body.telefono,
      req.body.celular,
      req.body.id,
    ],
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ error: "Error al actualizar " });
      }
    }
  );

  //VERIFICAMOS SI ES ORGANIZACION
  const qOrg =
    "UPDATE organizacion SET `nombre` = ? ,`tipo_entidad` = ?, `direccion` = ?, `telefono` = ?, `celular` = ? WHERE idorg = ?";
  db.query(
    qOrg,
    [
      req.body.nombre,
      req.body.tipo_entidad,
      req.body.direccion,
      req.body.telefono,
      req.body.celular,
      req.body.id,
    ],
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        return res.status(500).json({ error: "Error al actualizar " });
      }
    }
  );

  // const updateValues = [
  //   req.body.nombre,
  //   req.body.descripcion,
  //   req.body.fecha_vencimiento,
  //   req.body.unidad_de_medida,
  // ];

  // updateValues.push(req.body.id);

  // db.query(q, updateValues, (err, data) => {
  //   if (err) {
  //     console.log("Error:", err);
  //     return res.status(500).json({ error: "Error al actualizar " });
  //   }
  //   res.status(200).json({ message: "actualizado correctamente" });
  // });
  res.status(200).json({ message: "ok" });
};
