import { db } from "../connect.js";

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
      // console.log(results);
      res.json(results);
    }
  });
};

export const getAdminin = (req, res) => {
  const { buscar } = req.query;
  const sql = `SELECT u.idusuario ID, u.img_perfil foto, u.correo, CONCAT_WS(' ', apellido_pat ,apellido_mat,nombre ) nombre
                FROM usuario u
                INNER JOIN admin a ON u.idusuario = a.idadmin
                WHERE u.idusuario like '${buscar}%'
                OR u.correo like '%${buscar}%'
                OR CONCAT_WS(' ', apellido_pat ,apellido_mat,nombre ) like '%${buscar}%';`;

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
  const sql = `SELECT u.idusuario ID, u.img_perfil foto, u.correo, CONCAT_WS(' ', apellido_pat ,apellido_mat,nombre ) nombre, v.celular, obtenerVoluntarioXCantidad(u.idusuario, 'Entregado') as 'Cantidad entregada',  obtenerVoluntarioXCantidad(u.idusuario, 'Pendiente') as'Cantidad pendiente'
                FROM usuario u
                INNER JOIN voluntario v ON u.idusuario = v.idvoluntario
                WHERE u.idusuario like '${buscar}%'
                OR u.correo like '%${buscar}%'
                OR CONCAT_WS(' ', apellido_pat ,apellido_mat,nombre ) like '%${buscar}%';`;

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
                        CONCAT(Coalesce(cantidad_disponible, 0)+ coalesce(cantidad_reservada,0) + coalesce(cantidad_no_disponible,0), ' ', a.unidad_medida) cant_don, 
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
                TMP.estado, TMP.fecha_entrega as 'fecha entrega', TMP.alimentos
              FROM (SELECT d.iddonacion, obtenerNombreGeneralx(g.idgeneral, g.tipo) AS nomReceptor, 
                d.tipo_envio, 
                CASE 
                  WHEN TRIM(CONCAT_WS(' ', v.apellido_pat, v.apellido_mat, v.nombre)) = '' OR 
                    TRIM(CONCAT_WS(' ', v.apellido_pat, v.apellido_mat, v.nombre)) IS NULL 
                  THEN '-'
                  ELSE TRIM(CONCAT_WS(' ', v.apellido_pat, v.apellido_mat, v.nombre))
                END AS nomVoluntario, 
                d.estado, DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') fecha_entrega, obtenerNombreAlimentoYCantidadPorDonacion(d.iddonacion) alimentos
              FROM donacion d
              INNER JOIN general g ON d.idgeneral = g.idgeneral
              LEFT JOIN voluntario v ON v.idvoluntario = d.idvoluntario) TMP
              WHERE TMP.tipo_envio like '%${firstSelectValue}%'
              AND TMP.estado like '%${secondSelectValue}%'
              AND (TMP.nomReceptor like '%${buscar}%' COLLATE utf8mb4_unicode_ci
              OR TMP.iddonacion like '${buscar}%'
              OR TMP.nomVoluntario like '%${buscar}%'
              OR TMP.alimentos like '%${buscar}%' COLLATE utf8mb4_unicode_ci);
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
  const sql = `SELECT a.nombre, SUM(ta.cantidad) cantidad
              FROM donacion d
              INNER JOIN tiene_a ta ON ta.iddonacion = d.iddonacion
              INNER JOIN alimento a ON a.idalimento =ta.idalimento
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
  CONCAT(Coalesce(cantidad_disponible, 0)+ coalesce(cantidad_reservada,0) + coalesce(cantidad_no_disponible,0) , ' ', unidad_medida) 'cant. total' , CONCAT(cantidad_no_disponible , ' ', unidad_medida) 'cant. entregada'
    FROM alimento
                WHERE idgeneral = '${iduser}'
                -- ORDER BY entregado desc`;

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
  const sql = `SELECT d.iddonacion,a.imagen, a.nombre, d.tipo_envio 'tipo de envio', DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') 'fecha entrega',  CONCAT(ta.cantidad, ' ', a.unidad_medida) cantidad
              FROM DONACION d
              INNER JOIN TIENE_A ta ON d.iddonacion = ta.iddonacion AND d.idgeneral = '${iduser}'
              INNER JOIN alimento a ON a.idalimento = ta.idalimento
              WHERE d.estado like 'Entregado';
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
                                  AND d.estado = "Entregado"
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
  const sql = `SELECT u.img_perfil foto,  obtenerNombreGeneralx(u.idusuario, g.tipo) receptor, d.iddonacion,
                obtenerNombreAlimentoYCantidadPorDonacion(d.iddonacion) alimentos, DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') 'fecha entrega'
              FROM DONACION d
                          INNER JOIN general g ON d.idgeneral = g.idgeneral
                          INNER JOIN usuario u ON u.idusuario = g.idgeneral
              WHERE d.idvoluntario = '${iduser}'
              AND d.estado like 'Entregado';`;

  // const sql = `SELECT u.img_perfil foto,  obtenerNombreGeneralx(u.idusuario, g.tipo) receptor, d.iddonacion,
  //               a.nombre alimento, CONCAT(ta.cantidad,' ',a.unidad_medida) cantidad,
  //                         DATE_FORMAT(d.fecha_entrega, '%Y-%m-%d') 'fecha entrega'
  //             FROM DONACION d
  //             INNER JOIN general g ON d.idgeneral = g.idgeneral
  //             INNER JOIN usuario u ON u.idusuario = g.idgeneral
  //             INNER JOIN TIENE_A ta ON d.iddonacion = ta.iddonacion
  //             INNER JOIN alimento a ON a.idalimento = ta.idalimento
  //             WHERE d.idvoluntario = '${iduser}'
  //                       AND d.estado like 'Entregado'
  //             `;

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
      // console.log(results);
      res.json(results);
    }
  });
};
