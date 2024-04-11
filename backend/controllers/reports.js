import { db } from "../connect.js";

// export const filterAdmin = (req, res) => {
//   const { idusuario, correo, nombre } = req.query;
//   // console.log(idusuario, correo, nombre);

//   const sql = `SELECT *
//               FROM usuario u
//               INNER JOIN admin a ON u.idusuario = a.idadmin
//               WHERE u.idusuario like '${idusuario}%'
//               AND lower(u.correo) like '%${correo.toLowerCase()}%'
//               AND lower(CONCAT(a.nombre, ' ', a.apellido_pat, ' ', a.apellido_mat)) like '%${nombre.toLowerCase()}%';`;
//   const parm = [];

//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const filterVolunteer = (req, res) => {
//   const { idusuario, correo, nombre, celular } = req.query;
//   // console.log(idusuario, correo, nombre, celular);

//   const sql = `SELECT u.*, v.*,
//               (SELECT COUNT(*) FROM donacion d1 WHERE d1.idvoluntario = v.idvoluntario AND d1.estado = 'Pendiente' AND d1.tipo_envio = 'Voluntario') AS pendiente,
//               (SELECT COUNT(*) FROM donacion d2 WHERE d2.idvoluntario = v.idvoluntario AND d2.estado = 'Entregado' AND d2.tipo_envio = 'Voluntario') AS recibidos
//             FROM usuario u
//             INNER JOIN voluntario v ON u.idusuario = v.idvoluntario
//             WHERE u.idusuario like '${idusuario}%'
//             AND lower(u.correo) like '%${correo}%'
//             AND lower(CONCAT(v.nombre, ' ', v.apellido_pat, ' ', v.apellido_mat)) like '%${nombre}%'
//             AND v.celular like '${celular}%';
// `;
//   const parm = [];

//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const filterReceiver = (req, res) => {
//   const { idusuario, correo, nombre, tipo } = req.query;
//   // console.log(idusuario, correo, nombre, tipo);

//   const sql = `SELECT *
//               FROM (SELECT *,
//               CASE
//                   WHEN EXISTS (SELECT 1 FROM organizacion o WHERE o.idorg = g.idgeneral) THEN 'Organización'
//                   WHEN EXISTS (SELECT 1 FROM persona p WHERE p.idpersona = g.idgeneral) THEN 'Usuario Individual'
//                   ELSE 'No especificado'
//               END AS tipo,
//               CASE
//                   WHEN EXISTS (SELECT 1 FROM organizacion o WHERE o.idorg = g.idgeneral) THEN (SELECT o.nombre FROM organizacion o WHERE o.idorg = g.idgeneral)
//                   WHEN EXISTS (SELECT 1 FROM persona p WHERE p.idpersona = g.idgeneral) THEN (SELECT CONCAT(p.nombre, ' ', p.apellido_pat, ' ', p.apellido_mat) FROM persona p WHERE p.idpersona = g.idgeneral)
//                   ELSE 'No especificado'
//               END AS tipo_nombre,
//               (SELECT COUNT(*) FROM donacion d WHERE d.estado = 'Entregado' and d.idgeneral = g.idgeneral) AS entregados,
//               (SELECT COUNT(*) FROM donacion d WHERE d.estado = 'Pendiente' and d.idgeneral = g.idgeneral) AS pendientes
//             FROM usuario u
//             INNER JOIN general g ON u.idusuario = g.idgeneral
//             WHERE FIND_IN_SET('Receptor', REPLACE(g.rol, ' ', ',')) > 0
//             AND u.idusuario like '${idusuario}%'
//             AND u.correo like '%${correo}%'

//             GROUP BY u.idusuario) TMP
//             WHERE TMP.tipo_nombre like '%${nombre}%'
//             AND TMP.tipo like '%${tipo}%';
//   `;
//   const parm = [];

//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const filterDonor = (req, res) => {
//   const { idusuario, correo, nombre, tipo } = req.query;
//   // console.log(idusuario, correo, nombre, tipo);

//   const sql = `SELECT *
//               FROM(SELECT u.idusuario, u.correo,
//                 CASE
//                     WHEN o.idorg IS NOT NULL THEN 'Organización'
//                     WHEN p.idpersona IS NOT NULL THEN 'Usuario Individual'
//                     ELSE 'No especificado'
//                 END AS tipo,
//                 COALESCE(o.nombre, CONCAT(p.apellido_pat, ' ', p.apellido_mat, ' ', p.nombre), 'No se encontró') AS tipo_nombre,
//                 COUNT(DISTINCT a.idalimento) AS donaciones_publicadas,
//                 SUM(CASE WHEN d.estado = 'Pendiente' THEN 1 ELSE 0 END) AS donaciones_pendientes,
//                 SUM(CASE WHEN d.estado = 'Entregado' THEN 1 ELSE 0 END) AS donaciones_entregadas
//               FROM usuario u
//               INNER JOIN general g ON u.idusuario = g.idgeneral
//               LEFT JOIN organizacion o ON u.idusuario = o.idorg
//               LEFT JOIN persona p ON u.idusuario = p.idpersona
//               LEFT JOIN alimento a ON u.idusuario = a.idgeneral
//               LEFT JOIN donacion d ON d.idalimento = a.idalimento
//               WHERE FIND_IN_SET('Donador', REPLACE(g.rol, ' ', ',')) > 0
//               AND u.idusuario like '${idusuario}%'
//               AND u.correo like '%${correo}%'
//               GROUP BY u.idusuario, u.correo, tipo, tipo_nombre
//               ) TMP
//               WHERE TMP.tipo_nombre like '%${nombre}%'
//               AND TMP.tipo like '%${tipo}%'
//               ORDER BY 1;
//   `;
//   const parm = [];

//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const filterFood = (req, res) => {
//   const {
//     idalimento,
//     nombre,
//     estado,
//     fecha_vencimiento,
//     fecha_publicacion,
//     idgeneral,
//     nombre_donante,
//   } = req.query;
//   // console.log(idalimento, nombre, estado, fecha_vencimiento, fecha_publicacion);

//   const sql = `SELECT *
//               FROM (SELECT a.*,
//                 CASE
//                     WHEN p.idpersona IS NOT NULL THEN CONCAT(p.nombre, ' ', p.apellido_pat, ' ', p.apellido_mat)
//                     WHEN o.idorg IS NOT NULL THEN o.nombre
//                 END AS nombre_donante
//               FROM
//                 alimento a
//               LEFT JOIN
//                 persona p ON a.idgeneral = p.idpersona
//               LEFT JOIN
//                 organizacion o ON a.idgeneral = o.idorg
//               WHERE
//                 a.idalimento like '${idalimento}%'
//                 AND lower(a.nombre) like '%${nombre.toLowerCase()}%'
//                 AND lower(a.estado) like '%${estado.toLowerCase()}%'
//                 AND (DATE_FORMAT(a.fecha_vencimiento, '%Y-%m-%d') = '${fecha_vencimiento}' OR '${fecha_vencimiento}' = '')
//                 AND (DATE_FORMAT(a.fecha_publicacion, '%Y-%m-%d') = '${fecha_publicacion}' OR '${fecha_publicacion}' = '')
//                 AND a.idgeneral like '${idgeneral}%'
//               ORDER BY 1)TMP
//               WHERE TMP.nombre_donante like '%${nombre_donante}%'
//               `;
//   const parm = [];

//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const filterDonations = (req, res) => {
//   const {
//     iddonacion,
//     tipo_envio,
//     xestado,
//     nombreVoluntario,
//     fechaInicial,
//     fechaFinal,
//     nombreReceptor,
//     nombreDonante,
//     nombreAlimento,
//   } = req.query;
//   // console.log(
//   //   iddonacion,
//   //   tipo_envio,
//   //   nombreVoluntario,
//   //   fechaInicial,
//   //   fechaFinal,
//   //   xestado,
//   //   nombreReceptor,
//   //   nombreDonante,
//   //   nombreAlimento
//   // );

//   let nombreVoluntarioCondition = `lower(CONCAT(v.apellido_pat, ' ', v.nombre)) like '%${nombreVoluntario.toLowerCase()}%'`;
//   if (nombreVoluntario === "") {
//     nombreVoluntarioCondition = `v.nombre is NULL OR v.nombre like '%'`;
//   }

//   const sql = `
//     SELECT
//     d.*,
//     a.idalimento,
//     a.nombre AS nombre_alimento,
//     a.imagen AS imagen_alimento,
//     a.idgeneral AS id_donador,
//     COALESCE(CONCAT(v.apellido_pat, ' ', v.nombre), '-') AS nombre_voluntario,
//     COALESCE(CONCAT(p.apellido_pat, ' ', p.nombre), o.nombre, 'No encontrado') AS nombre_receptor,
//     COALESCE(CONCAT(p1.apellido_pat, ' ', p1.nombre), o1.nombre, 'No encontrado') AS nombre_donador
//   FROM
//     donacion d
//     INNER JOIN alimento a ON d.idalimento = a.idalimento
//     LEFT JOIN voluntario v ON d.idvoluntario = v.idvoluntario
//     LEFT JOIN persona p ON d.idgeneral = p.idpersona
//     LEFT JOIN organizacion o ON d.idgeneral = o.idorg
//     LEFT JOIN persona p1 ON a.idgeneral = p1.idpersona
//     LEFT JOIN organizacion o1 ON a.idgeneral = o1.idorg
//   WHERE
//   d.iddonacion like '${iddonacion}%'
//   AND lower(d.tipo_envio) like '%${tipo_envio}%'
//   AND (${nombreVoluntarioCondition})
//   AND (DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') >= '${fechaInicial}' OR '${fechaInicial}' = '')
//   AND (DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') <= '${fechaFinal}' OR '${fechaFinal}' = '')
//   AND lower(d.estado) like '%${xestado}%'
//   AND lower(a.nombre) like '%${nombreAlimento}%'
//   AND (lower(CONCAT(p.apellido_pat, ' ', p.nombre)) like '%${nombreReceptor.toLowerCase()}%'
//     OR  lower(o.nombre) like '%${nombreReceptor.toLowerCase()}%')
//   AND (lower(CONCAT(p1.apellido_pat, ' ', p1.nombre)) like '%${nombreDonante.toLowerCase()}%'
//     OR  lower(o1.nombre) like '%${nombreDonante.toLowerCase()}%')
//     ORDER BY 1;
//   `;

//   const parm = [];
//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const filterAlimentos = (req, res) => {
//   const { fechaInicial, fechaFinal, xestado } = req.query;
//   // console.log(fechaInicial, fechaFinal, xestado);

//   let sql;
//   let parm;

//   if (xestado === "TODO") {
//     sql = `SELECT * FROM alimento
//     WHERE DATE_FORMAT(fecha_publicacion, '%Y-%m-%d') >= ?
//   AND DATE_FORMAT(fecha_publicacion, '%Y-%m-%d') <= ?`;
//     parm = [fechaInicial, fechaFinal];
//   } else {
//     sql = `
//   SELECT d.*
//   FROM donacion d

//   WHERE DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') >= ?
//   AND DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') <= ?
//   AND d.estado = ?
//       `;
//     parm = [fechaInicial, fechaFinal, xestado];
//   }

//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       // console.log(results);
//     }
//   });
// };

// export const CategoryType = (req, res) => {
//   const sql = `
//   SELECT c.nombre_cat AS categoria,
//   COUNT(a.idalimento) AS cantidad_alimentos
// FROM CATEGORIA c
// LEFT JOIN TIENE_C tc ON c.idcategoria = tc.idcategoria
// LEFT JOIN ALIMENTO a ON tc.idalimento = a.idalimento
// GROUP BY c.nombre_cat;
//   `;

//   const parm = [];
//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       res.json(results);
//       console.log(results);
//     }
//   });
// };

// export const UserType = (req, res) => {
//   const sql = `
//   SELECT
//   (SELECT COUNT(DISTINCT idvoluntario) FROM VOLUNTARIO) AS cantidad_voluntarios,
//   (SELECT COUNT(DISTINCT idpersona) FROM PERSONA) AS cantidad_personas,
//   (SELECT COUNT(DISTINCT idorg) FROM ORGANIZACION) AS cantidad_organizaciones;`;

//   const parm = [];
//   db.query(sql, parm, (error, results) => {
//     if (error) {
//       console.error("Error al ejecutar la consulta SQL:", error);
//       res.status(500).send("Error interno del servidor");
//     } else {
//       const resultadoFinal = results
//         .map((item) => {
//           return [
//             {
//               categoria: "cantidad voluntarios",
//               cantidad_alimentos: item.cantidad_voluntarios,
//             },
//             {
//               categoria: "cantidad personas",
//               cantidad_alimentos: item.cantidad_personas,
//             },
//             {
//               categoria: "cantidad organizaciones",
//               cantidad_alimentos: item.cantidad_organizaciones,
//             },
//           ];
//         })
//         .flat();

//       console.log(resultadoFinal);
//       res.json(resultadoFinal);
//       // console.log(results);
//     }
//   });
// };

// ===========================================================
export const contarMiembrosDonacionesAlimentos = (req, res) => {
  const sql = "CALL contarMiembrosDonacionesAlimentos();";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results[0][0]);
      res.json(results[0][0]);
    }
  });
};

export const getAllUserData = (req, res) => {
  const { secondSelectValue, buscar } = req.query;
  const sql = `SELECT TMP.idusuario ID, TMP.img_perfil FOTO, TMP.nombre, TMP.correo, TMP.tipo, TMP.rol
              FROM (
                SELECT u.idusuario, u.img_perfil, obtenerNombreUs(u.idusuario) AS nombre, u.correo, obtenerTipoUsuario(u.idusuario) AS tipo, obtenerRolesPorIDFunc(u.idusuario) AS rol
                FROM usuario u
              ) TMP
              WHERE (TMP.idusuario like '${buscar || ""}%'
              OR TMP.correo like '%${buscar || ""}%'
              OR TMP.nombre like '%${buscar || ""}%' COLLATE utf8mb4_unicode_ci)
              AND TMP.tipo like '%${
                secondSelectValue || ""
              }%' COLLATE utf8mb4_unicode_ci;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

export const getAdminin = (req, res) => {
  const { buscar } = req.query;
  const sql = `SELECT u.idusuario ID, u.img_perfil foto, u.correo, CONCAT_WS(' ',apellido_mat, apellido_pat,nombre ) nombre
                FROM usuario u
                INNER JOIN admin a ON u.idusuario = a.idadmin
                WHERE u.idusuario like '${buscar}%'
                OR u.correo like '%${buscar}%'
                OR CONCAT_WS(' ',apellido_mat, apellido_pat,nombre ) like '%${buscar}%';`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getVolunteers = (req, res) => {
  const { buscar } = req.query;
  const sql = `SELECT u.idusuario ID, u.img_perfil foto, u.correo, CONCAT_WS(' ',v.apellido_mat, v.apellido_pat,v.nombre ) nombre, v.celular, obtenerVoluntarioXCantidad(u.idusuario, 'Entregado') as 'Catidad entregada',  obtenerVoluntarioXCantidad(u.idusuario, 'Pendiente') as'Cantidad pendiente'
                FROM usuario u
                INNER JOIN voluntario v ON u.idusuario = v.idvoluntario
                WHERE u.idusuario like '${buscar}%'
                OR u.correo like '%${buscar}%'
                OR CONCAT_WS(' ',v.apellido_mat, v.apellido_pat,v.nombre ) like '%${buscar}%';`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getDonors = (req, res) => {
  const { secondSelectValue, buscar } = req.query;
  const sql = `SELECT TMP.idusuario ID, TMP.img_perfil foto, TMP.nombre, TMP.correo, TMP.tipo, 
                      TMP.publicadas 'Donaciones publicadas', TMP.entregadas as'Donaciones entregadas',
                      TMP.pendiente as 'Donaciones pendientes'
              FROM (SELECT u.idusuario, 
                    u.img_perfil, 
                    obtenerNombreGeneralx(u.idusuario, g.tipo) nombre, 
                      u.correo, 
                      obtenerTipoUsuario(u.idusuario) tipo,
                      cantidadAlimentoPublicadoDonadorx(u.idusuario) publicadas ,
                      cantidadDonadorxEstadox(u.idusuario, 'entregado') entregadas, 
                      cantidadDonadorxEstadox(u.idusuario, 'pendiente') pendiente 
                  FROM usuario u
                  INNER JOIN general g ON u.idusuario = g.idgeneral) TMP
              WHERE (TMP.idusuario like '${buscar}%'
              OR TMP.correo like '%${buscar}%'
              OR TMP.nombre like '%${buscar}%' COLLATE utf8mb4_unicode_ci)
              AND TMP.tipo like '%${secondSelectValue}%' COLLATE utf8mb4_unicode_ci
              ;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getReceiver = (req, res) => {
  const { secondSelectValue, buscar } = req.query;
  const sql = `SELECT TMP.idusuario ID, TMP.img_perfil foto, TMP.nombre, TMP.correo, TMP.tipo, 
                      TMP.entregado as 'Donaciones recibidas',TMP.pendiente as 'Donaciones pendientes'
              FROM (SELECT u.idusuario, u.img_perfil, 
                    obtenerNombreGeneralx(u.idusuario, g.tipo) nombre, 
                      u.correo, obtenerTipoUsuario(u.idusuario) tipo,
                      cantidadReceptorxEstadox(u.idusuario, 'entregado') entregado,
                      cantidadReceptorxEstadox(u.idusuario, 'pendiente') pendiente
                  FROM usuario u
                  INNER JOIN general g ON u.idusuario = g.idgeneral) TMP
              WHERE (TMP.idusuario like '${buscar}%'
              OR TMP.correo like '%${buscar}%'
              OR TMP.nombre like '%${buscar}%' COLLATE utf8mb4_unicode_ci)
              AND TMP.tipo like '%${secondSelectValue}%' COLLATE utf8mb4_unicode_ci`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getFood = (req, res) => {
  const {
    firstSelectValue,
    secondSelectValue,
    fechaInicial,
    fechaFinal,
    buscar,
  } = req.query;

  const sql = `SELECT TMP.idalimento ID, TMP.imagen, TMP.nombre, TMP.categoria, TMP.cant_don as 'Cantidad donada', 
                          TMP.cant_disp as 'cantidad disponible', 
                          TMP.estado, TMP.fecha_vencimiento as 'fecha vencimiento', 
                          TMP.fecha_publicacion as 'fecha publicación',
                          TMP.nom_don as 'Nombre donante'
              FROM (SELECT a.idalimento, a.imagen, 
                        a.nombre, obtenerCategoriasAlimentox(a.idalimento) categoria,
                        CONCAT(a.cantidad_donada, ' ', a.unidad_medida) cant_don, 
                        CONCAT(a.cantidad_disponible, ' ', a.unidad_medida) cant_disp, 
                        a.estado,DATE_FORMAT(a.fecha_vencimiento, '%Y-%m-%d') fecha_vencimiento , 
                        DATE_FORMAT( a.fecha_publicacion, '%Y-%m-%d') fecha_publicacion,a.idgeneral,
                        obtenerNombreGeneralx(g.idgeneral, g.tipo) nom_don
                    FROM alimento a
                    INNER JOIN general g ON a.idgeneral = g.idgeneral) TMP
                WHERE (TMP.idalimento like  '${buscar}%'
                OR TMP.nombre like  '%${buscar}%'
                OR TMP.nom_don like  '%${buscar}%' COLLATE utf8mb4_unicode_ci
                OR TMP.categoria like '%${buscar}%' COLLATE utf8mb4_unicode_ci)
                AND TMP.estado like '%${firstSelectValue}%' 
                AND (('${secondSelectValue}' like 'no-vencido' AND TMP.fecha_vencimiento >= CURRENT_DATE()) 
                OR ('${secondSelectValue}' like 'vencido' AND TMP.fecha_vencimiento < CURRENT_DATE() ) OR  '${secondSelectValue}' like '')
                AND ((TMP.fecha_publicacion >= '${fechaInicial}' AND TMP.fecha_publicacion <= '${fechaFinal}') OR '${fechaInicial}' like '')
                ;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
      // console.log(secondSelectValue);
    }
  });
};

export const getDonations = (req, res) => {
  const { firstSelectValue, secondSelectValue, buscar } = req.query;

  const sql = `SELECT TMP.iddonacion as 'ID donacion', TMP.nomReceptor as 'Receptor', 
                  TMP.tipo_envio as 'Tipo envio', TMP.nomVoluntario voluntario, 
                  TMP.estado, TMP.fecha_entrega as 'fecha entrega', TMP.cantidad, TMP.alimento,
                  TMP.imagen
                FROM (SELECT d.iddonacion, obtenerNombreGeneralx(g.idgeneral, g.tipo) AS nomReceptor, 
                  d.tipo_envio, 
                  CASE 
                    WHEN TRIM(CONCAT_WS(' ', v.apellido_pat, v.apellido_mat, v.nombre)) = '' OR 
                      TRIM(CONCAT_WS(' ', v.apellido_pat, v.apellido_mat, v.nombre)) IS NULL 
                    THEN '-'
                    ELSE TRIM(CONCAT_WS(' ', v.apellido_pat, v.apellido_mat, v.nombre))
                  END AS nomVoluntario, 
                  d.estado, DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') fecha_entrega, CONCAT(d.cantidad_donacion, ' ', a.unidad_medida) cantidad, a.nombre alimento,
                  a.imagen
                FROM donacion d
                INNER JOIN general g ON d.idgeneral = g.idgeneral
                INNER JOIN alimento a ON a.idalimento = d.idalimento
                LEFT JOIN voluntario v ON v.idvoluntario = d.idvoluntario) TMP
                WHERE TMP.tipo_envio like '%${firstSelectValue}%'
                AND TMP.estado like '%${secondSelectValue}%'
                AND (TMP.nomReceptor like '%${buscar}%' COLLATE utf8mb4_unicode_ci
                OR TMP.iddonacion like '${buscar}%'
                OR TMP.nomVoluntario like '%${buscar}%'
                OR TMP.alimento like '%${buscar}%');
                `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
      // console.log(firstSelectValue, secondSelectValue, buscar);
    }
  });
};

export const nroUser = (req, res) => {
  const sql = "CALL cantidadUsuariosAdminVolReceptDonador();";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      console.log(results[0][0]);
      res.json(results[0][0]);
    }
  });
};

export const nroTypeUser = (req, res) => {
  const sql = "CALL cantidadUsuariosOrgIndiv();";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results[0][0]);
      res.json(results[0][0]);
    }
  });
};

export const nroVencidosNoVencidos = (req, res) => {
  const sql = `SELECT
                  SUM(CASE WHEN fecha_vencimiento < CURDATE() THEN 1 ELSE 0 END) AS vencidos,
                  SUM(CASE WHEN fecha_vencimiento >= CURDATE() THEN 1 ELSE 0 END) AS 'no vencidos'
                FROM
                  Alimento;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results[0]);
    }
  });
};

export const nroAlimentoDisponibleAgotado = (req, res) => {
  const sql = `SELECT
                SUM(CASE WHEN estado like 'disponible' THEN 1 ELSE 0 END) AS disponible,
                SUM(CASE WHEN estado like 'agotado' THEN 1 ELSE 0 END) AS 'agotado'
              FROM
                Alimento;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results[0]);
    }
  });
};

export const nroAlimentoCategorias = (req, res) => {
  const sql = `SELECT c.nombre_cat, COUNT(*) cantidad
              FROM tiene_c tc
              INNER JOIN categoria c ON tc.idcategoria = c.idcategoria
              GROUP BY tc.idcategoria;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      const convertedData = results.reduce((acc, obj) => {
        acc[obj.nombre_cat] = obj.cantidad;
        return acc;
      }, {});

      // console.log(convertedData);
      res.json(convertedData);
    }
  });
};

export const nroAlimentosRecibidos = (req, res) => {
  const sql = `SELECT a.nombre, COUNT(*) cantidad
              FROM donacion d
              INNER JOIN alimento a ON a.idalimento = d.idalimento
              WHERE d.estado like 'Entregado'
              GROUP BY  a.nombre;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      const convertedData = results.reduce((acc, obj) => {
        acc[obj.nombre] = obj.cantidad;
        return acc;
      }, {});

      // console.log(results);
      // console.log(convertedData);
      res.json(convertedData);
    }
  });
};

export const nroTipoEnvio = (req, res) => {
  const sql = `SELECT
                SUM(CASE WHEN tipo_envio like 'personal' THEN 1 ELSE 0 END) AS personal,
                SUM(CASE WHEN tipo_envio like 'voluntario' THEN 1 ELSE 0 END) AS voluntario
                FROM
                donacion;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results[0]);
    }
  });
};

export const nroEstadoEntrega = (req, res) => {
  const sql = `SELECT
                SUM(CASE WHEN estado like 'solicitado' THEN 1 ELSE 0 END) AS solicitado,
                SUM(CASE WHEN estado like 'pendiente' THEN 1 ELSE 0 END) AS pendiente,
                SUM(CASE WHEN estado like 'entreado...' THEN 1 ELSE 0 END) AS 'entreado...',
                SUM(CASE WHEN estado like 'entregado' THEN 1 ELSE 0 END) AS entregado,
                SUM(CASE WHEN estado like 'cancelado' THEN 1 ELSE 0 END) AS cancelado,
                SUM(CASE WHEN estado like 'rechazado' THEN 1 ELSE 0 END) AS rechazado
                FROM
                donacion;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results[0]);
    }
  });
};

export const getDonationsUserx = (req, res) => {
  const { iduser } = req.query;
  const sql = ` SELECT imagen,nombre, obtenerCategoriasAlimentox(idalimento) categoria, DATE_FORMAT(fecha_publicacion, '%Y-%m-%d') 'fecha publicacion', 
              CONCAT(cantidad_donada, ' ', unidad_medida) 'cant. total', CONCAT(cantidad_donada - cantidad_disponible , ' ', unidad_medida) 'Entregado'
                FROM alimento
                WHERE idgeneral = '${iduser}'
                ORDER BY entregado desc`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getCateFoodUserx = (req, res) => {
  const { iduser } = req.query;
  const sql = ` SELECT c.nombre_cat, COUNT(*) cantidad
                FROM tiene_c tc
                INNER JOIN categoria c ON tc.idcategoria = c.idcategoria
                INNER JOIN alimento a ON tc.idalimento = a.idalimento AND a.idgeneral = '${iduser}'
                GROUP BY tc.idcategoria, c.nombre_cat`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getDonMonth = (req, res) => {
  const { iduser } = req.query;
  const sql = ` SELECT meses.nombre_mes AS mes, COALESCE(COUNT(alimento.fecha_publicacion), 0) AS cantidad
                FROM (
                    SELECT 1 AS mes, 'Enero' AS nombre_mes
                    UNION SELECT 2, 'Febrero'
                    UNION SELECT 3, 'Marzo'
                    UNION SELECT 4, 'Abril'
                    UNION SELECT 5, 'Mayo'
                    UNION SELECT 6, 'Junio'
                    UNION SELECT 7, 'Julio'
                    UNION SELECT 8, 'Agosto'
                    UNION SELECT 9, 'Septiembre'
                    UNION SELECT 10, 'Octubre'
                    UNION SELECT 11, 'Noviembre'
                    UNION SELECT 12, 'Diciembre'
                ) AS meses
                LEFT JOIN alimento ON MONTH(alimento.fecha_publicacion) = meses.mes
                                  AND alimento.idgeneral = '${iduser}'
                                  AND YEAR(alimento.fecha_publicacion) = YEAR(CURDATE())
                GROUP BY meses.mes, meses.nombre_mes
                ORDER BY meses.mes;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getDonRec = (req, res) => {
  const { iduser } = req.query;
  const sql = `SELECT a.imagen, a.nombre, d.tipo_envio 'tipo de envio', DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') 'fecha entrega', CONCAT(d.cantidad_donacion, ' ', a.unidad_medida) cantidad
              FROM donacion d
              INNER JOIN alimento a ON d.idalimento = a.idalimento
              WHERE d.estado like 'Entregado'
              AND d.idgeneral like '${iduser}'
              `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getRecMonth = (req, res) => {
  const { iduser } = req.query;
  const sql = ` SELECT meses.nombre_mes AS mes, COALESCE(COUNT(d.fecha_entrega), 0) AS cantidad
                FROM (
                    SELECT 1 AS mes, 'Enero' AS nombre_mes
                    UNION SELECT 2, 'Febrero'
                    UNION SELECT 3, 'Marzo'
                    UNION SELECT 4, 'Abril'
                    UNION SELECT 5, 'Mayo'
                    UNION SELECT 6, 'Junio'
                    UNION SELECT 7, 'Julio'
                    UNION SELECT 8, 'Agosto'
                    UNION SELECT 9, 'Septiembre'
                    UNION SELECT 10, 'Octubre'
                    UNION SELECT 11, 'Noviembre'
                    UNION SELECT 12, 'Diciembre'
                ) AS meses
                LEFT JOIN donacion d ON MONTH(d.fecha_entrega) = meses.mes
                                  AND d.idgeneral = '${iduser}'
                                  AND YEAR(d.fecha_entrega) = YEAR(CURDATE())
                GROUP BY meses.mes, meses.nombre_mes
                ORDER BY meses.mes;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getDonationVolunteer = (req, res) => {
  const { iduser } = req.query;
  const sql = `SELECT u.img_perfil foto, obtenerNombreGeneralx(u.idusuario, g.tipo) receptor,
                a.nombre alimento, CONCAT(d.cantidad_donacion,' ',a.unidad_medida) cantidad, 
                DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') 'fecha entrega'
              FROM donacion d
              INNER JOIN general g ON d.idgeneral = g.idgeneral
              INNER JOIN usuario u ON u.idusuario = g.idgeneral
              INNER JOIN alimento a ON a.idalimento = d.idalimento
              WHERE d.idvoluntario = '${iduser}'
              AND d.estado like 'Entregado'
              `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};

export const getDonationVolunteerMonth = (req, res) => {
  const { iduser } = req.query;
  const sql = ` SELECT meses.nombre_mes AS mes, COALESCE(COUNT(d.fecha_entrega), 0) AS cantidad
                FROM (
                    SELECT 1 AS mes, 'Enero' AS nombre_mes
                    UNION SELECT 2, 'Febrero'
                    UNION SELECT 3, 'Marzo'
                    UNION SELECT 4, 'Abril'
                    UNION SELECT 5, 'Mayo'
                    UNION SELECT 6, 'Junio'
                    UNION SELECT 7, 'Julio'
                    UNION SELECT 8, 'Agosto'
                    UNION SELECT 9, 'Septiembre'
                    UNION SELECT 10, 'Octubre'
                    UNION SELECT 11, 'Noviembre'
                    UNION SELECT 12, 'Diciembre'
                ) AS meses
                LEFT JOIN donacion d ON MONTH(d.fecha_entrega) = meses.mes
                                  AND d.idvoluntario = '${iduser}'
                                  AND d.estado = 'Entregado'
                                  AND YEAR(d.fecha_entrega) = YEAR(CURDATE())
                GROUP BY meses.mes, meses.nombre_mes
                ORDER BY meses.mes;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      // console.log(results);
      res.json(results);
    }
  });
};


export const nroInfoPerfil = (req, res) => {
  const { iduser } = req.query;
  const sql = ` SELECT cantidadAlimentoPublicadoDonadorx('${iduser}') alimentos_publicados,
                cantidadReceptorxEstadox('${iduser}', 'entregado')  alimentos_recibidos,
                cantidadDePeticionesUsuarioX('${iduser}') nro_peticiones;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

