import { db } from "../connect.js";
import moment from "moment/moment.js";
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
      order by n.fecha desc
      `;
    const queryResult = await queryDatabase(q, [data.idUsuario]);
    res.status(200).json(queryResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getNewNotificationsQty = async (req, res) => {
  const data = req.body;
  try {
    const notifQuery = `select count(idnotif) as newNotifQty from tiene_n where idusuario = ? and visto = 0`;
    const resNotif = await queryDatabase(notifQuery, [data.idUsuario]);
    res.status(200).json(resNotif);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const readAllNotif = async (req, res) => {
  const data = req.body;
  try {
    const notifQuery = `update tiene_n set visto = 1 where idusuario = ?`;
    const resNotif = await queryDatabase(notifQuery, [data.idUsuario]);
    res.status(200).json(resNotif);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const readNotif = async (req, res) => {
  const data = req.body;
  try {
    const notifQuery = `update tiene_n set visto = 1 where idusuario = ? and idnotif = ?`;
    const resNotif = await queryDatabase(notifQuery, [
      data.idUsuario,
      data.idNotif,
    ]);
    res.status(200).json(resNotif);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const sendNotification = async (req, res, notifData) => {
  const data = req.body;
  try {
    // datos de las queries por defecto
    let notifValues = [
      "Titulo",
      "Mensaje",
      moment().format(),
      notifData.type,
      "Tipo",
      `/detalles/${data.idDonacion}`,
    ];
    const idAdmin = 103; // id unico admin
    // querys
    const qInsert = ` insert into notificacion (titulo, mensaje, fecha, evento, tipo_notif, link)
      values(?,?,?,?,?,?)`;
    const qInsertTieneN =
      "insert into tiene_n (idusuario, idnotif) values (?,?)";
    // buscar datos Receptor
    const qRec = `select idgeneral as idGeneral, 
      nombre_idx_gen(idgeneral) as nombreGeneral from donacion 
      where iddonacion = ?`;
    const qRecResult = await queryDatabase(qRec, [data.idDonacion]);
    // buscar nombre Voluntario
    const qVol = "select nombre_voluntario_x(?) as nombreVoluntario";
    const qVolResult = await queryDatabase(qVol, [data.idVoluntario]);
    if (notifData.type === "Asignacion voluntario") {
      // notificar al voluntario
      notifValues[0] = "Voluntario asignado";
      notifValues[1] = `Se te asignó como encargado de la donación COD: 
      ${padNumber(data.idDonacion, 6, "0")} de ${qRecResult[0].nombreGeneral} `;
      notifValues[4] = "Voluntario asignado";
      const insertNotifVol = await queryDatabase(qInsert, notifValues);
      await queryDatabase(qInsertTieneN, [
        data.idVoluntario,
        insertNotifVol.insertId,
      ]);

      // notificar al usuario
      notifValues[1] = `Se ha asignado al voluntario 
      ${qVolResult[0].nombreVoluntario} a tu donacion 
      ${padNumber(data.idDonacion, 6, "0")}`;
      const insertNotifUser = await queryDatabase(qInsert, notifValues);
      await queryDatabase(qInsertTieneN, [
        qRecResult[0].idGeneral,
        insertNotifUser.insertId,
      ]);
    } else if (notifData.type === "Donacion solicitada") {
      notifValues[0] = "Donación solicitada";
      notifValues[1] = `El usuario ${
        qRecResult[0].nombreGeneral
      } realizó la solicitud de la 
      donación con COD: ${padNumber(data.idDonacion, 6, "0")}`;
      notifValues[4] = "Solicitud donacion";
      // TO DO: obtener a todos los admins y enviarles la notificacion
      const insertNotifAdmin = await queryDatabase(qInsert, notifValues);
      await queryDatabase(qInsertTieneN, [idAdmin, insertNotifAdmin.insertId]);
    } else if (notifData.type === "Cambio de estado") {
      if (data.estado === "Pendiente") {
        notifValues[0] = "Tu donación ha sido aceptada";
        notifValues[1] = `La donación con COD: 
        ${padNumber(data.idDonacion, 6, "0")} 
        fue aceptada por un administrador, consulta los detalles de entrega`;
        notifValues[4] = "Donacion pendiente";
        const insertNotifUser = await queryDatabase(qInsert, notifValues);
        await queryDatabase(qInsertTieneN, [
          data.idGeneral,
          insertNotifUser.insertId,
        ]);
      } else if (
        data.estado === "Confirmando" &&
        !data.confReceptor &&
        data.confVoluntario
      ) {
        // el voluntario confirmo, notificar al receptor
        notifValues[0] = "Tu donación esta siendo entregada";
        if (data.idVoluntario) {
          notifValues[1] = `El voluntario ${qVolResult[0].nombreVoluntario}`;
        } else {
          notifValues[1] = "Un administrador";
        }
        notifValues[1] += ` ha confirmado la entrega de la donación COD:  
          ${padNumber(data.idDonacion, 6, "0")}, confirma la recepción`;
        notifValues[4] = "Confirmando donacion";
        const insertNotifVol = await queryDatabase(qInsert, notifValues);
        await queryDatabase(qInsertTieneN, [
          data.idGeneral,
          insertNotifVol.insertId,
        ]);
      } else if (
        data.estado === "Entregado" &&
        data.confReceptor &&
        data.confVoluntario
      ) {
        // tanto el usuario como el voluntario o admin confirmaron, notificar entrega
        notifValues[0] = "Donación entregada";
        notifValues[1] = `La donación con COD: 
          ${padNumber(data.idDonacion, 6, "0")} 
          fue entregada exitosamente, consulta los detalles y 
          el recibo en la sección de donaciones`;
        notifValues[4] = "Donacion entregada";
        const insertNotifUser = await queryDatabase(qInsert, notifValues);
        await queryDatabase(qInsertTieneN, [
          data.idGeneral,
          insertNotifUser.insertId,
        ]);
        await queryDatabase(qInsertTieneN, [idAdmin, insertNotifUser.insertId]);
        await queryDatabase(qInsertTieneN, [
          data.idVoluntario,
          insertNotifUser.insertId,
        ]);
      } else if (data.estado === "Rechazado") {
        notifValues[0] = "Tu donación ha sido rechazada";
        notifValues[1] = `La petición de la donación con COD: 
        ${padNumber(data.idDonacion, 6, "0")} 
        fue rechazada por un administrador`;
        notifValues[4] = "Donacion rechazada";
        const insertNotifUser = await queryDatabase(qInsert, notifValues);
        await queryDatabase(qInsertTieneN, [
          data.idGeneral,
          insertNotifUser.insertId,
        ]);
      } else if (data.estado === "Cancelado") {
        // si usuario cancela, notificar al admin y voluntario
        notifValues[4] = "Donacion cancelada";
        if (data.usuarioCancela) {
          notifValues[0] = "Donación cancelada";
          notifValues[1] = `La petición de la donación con COD: 
          ${padNumber(data.idDonacion, 6, "0")} 
          fue cancelada, por el usuario ${qRecResult[0].nombreGeneral}`;
          no;
          const insertNotifUser = await queryDatabase(qInsert, notifValues);
          if (data.idVoluntario) {
            await queryDatabase(qInsertTieneN, [
              data.idVoluntario,
              insertNotifUser.insertId,
            ]);
          }
          await queryDatabase(qInsertTieneN, [
            idAdmin,
            insertNotifUser.insertId,
          ]);
        }
        // si voluntario o admin cancelan, notificar al ususario
        else {
          notifValues[0] = "Donación cancelada";
          notifValues[1] = `La petición de la donación con COD: 
          ${padNumber(data.idDonacion, 6, "0")} 
          fue cancelada`;
          if (data.idUsuario === idAdmin || !data.idVoluntario) {
            notifValues[1] += " por un administrador";
            //notificar voluntario
          } else if (data.idUsuario === data.idVoluntario) {
            notifValues[1] += ` por el voluntario
            ${qVolResult[0].nombreVoluntario}`;
          }
          const insertNotifUser = await queryDatabase(qInsert, notifValues);
          await queryDatabase(qInsertTieneN, [
            data.idGeneral,
            insertNotifUser.insertId,
          ]);
          if (data.idUsuario === idAdmin && data.idVoluntario) {
            await queryDatabase(qInsertTieneN, [
              data.idVoluntario,
              insertNotifUser.insertId,
            ]);
          }
        }
      }
    } else {
      console.log(
        "Notification not processed, can't match any funtion for the type: " +
          notifData.type
      );
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
