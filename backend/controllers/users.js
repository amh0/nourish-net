import { db } from "../connect.js";

export function padNumber(number, i, symbol) {
  if (number) {
    return number.toString().padStart(i, symbol);
  } else {
    let n = 0;
    return n.toString().padStart(i, symbol);
  }
}

export const getVolunteers = async (req, res) => {
  try {
    const q =
      "select *, concat(nombre, ' ',apellido_pat , ' ',apellido_mat) as nombreCompleto from voluntario";
    const queryResult = await queryDatabase(q);
    res.status(200).json(queryResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getNotificationsId = async (req, res) => {
  const data = req.body;
  try {
    const q = `
      select n.*, t.*
      from notificacion n 
        inner join tiene_n t
        on n.idnotif = t.idnotif
      where t.idusuario = ?
      `;
    const queryResult = await queryDatabase(q, [data.idUsuario]);
    console.log(queryResult);
    res.status(200).json(queryResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const sendNotification = async (req, res, notifData) => {
  const data = req.body;
  try {
    const qInsert = ` insert into notificacion (titulo, mensaje, fecha, tipo_not, link)
      values(?,?,?,?,?)`;
    const qInsertTieneN =
      "insert into tiene_n (idusuario, idnotif) values (?,?)";
    // buscar nombre Voluntario
    const qVol = "select nombre_voluntario_x(?) as nombreVoluntario";
    const qVolRes = await queryDatabase(qVol, [data.idVoluntario]);
    // buscar datos Receptor
    const qRec = `select idgeneral as idGeneral, 
      nombre_idx_gen(idgeneral) as nombreGeneral from donacion 
      where iddonacion = ?`;
    const qRecRes = await queryDatabase(qRec, [data.idDonacion]);
    if ((notifData.type = "Voluntario")) {
      // notificar al voluntario
      let notifValues = [
        "Voluntario asignado",
        `Se te asignó como encargado de la donación COD: ${padNumber(
          data.idDonacion,
          6,
          "0"
        )} de ${qRecRes[0].nombreGeneral} `,
        new Date().toJSON(),
        notifData.type,
        `/detalles/${data.idDonacion}`,
      ];
      const insertNotifVol = await queryDatabase(qInsert, notifValues);
      await queryDatabase(qInsertTieneN, [
        data.idVoluntario,
        insertNotifVol.insertId,
      ]);
      // notificar al usuario
      notifValues[1] = `Se ha asignado al voluntario ${qVolRes[0].nombreVoluntario} a tu donacion ${data.idDonacion}`;
      const insertNotifUser = await queryDatabase(qInsert, notifValues);
      await queryDatabase(qInsertTieneN, [
        qRecRes[0].idGeneral,
        insertNotifUser.insertId,
      ]);
    } else {
      console.log("querying other notif");
    }
  } catch (error) {
    console.log(error);
  }
};

const queryDatabase = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
