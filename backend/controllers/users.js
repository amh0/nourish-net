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

export const sendNotification = async (req, res, notifData) => {
  const data = req.body;
  console.log(moment().format());
  try {
    // datos de las queries por defecto
    let notifValues = [
      "Titulo",
      "Mensaje",
      moment().format(),
      notifData.type,
      `/detalles/${data.idDonacion}`,
    ];
    const idAdmin = 103; // id unico admin
    // querys
    const qInsert = ` insert into notificacion (titulo, mensaje, fecha, tipo_not, link)
      values(?,?,?,?,?)`;
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
    if (notifData.type === "Voluntario") {
      // notificar al voluntario
      notifValues[0] = "Voluntario asignado";
      notifValues[1] = `Se te asignó como encargado de la donación COD: 
      ${padNumber(data.idDonacion, 6, "0")} de ${qRecResult[0].nombreGeneral} `;
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
      // TO DO: obtener a todos los admins y enviarles la notificacion
      const insertNotifAdmin = await queryDatabase(qInsert, notifValues);
      await queryDatabase(qInsertTieneN, [idAdmin, insertNotifAdmin.insertId]);
    } else if (notifData.type === "Cambio de estado") {
      if (data.estado === "Pendiente") {
        console.log("----pendiente");
        notifValues[0] = "Tu donación ha sido aceptada";
        notifValues[1] = `La donación con COD: 
        ${padNumber(data.idDonacion, 6, "0")} 
        fue aceptada por un administrador, consulta los detalles de entrega`;
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
        let idUser = idAdmin;
        if (data.idVoluntario) {
          notifValues[1] = `El voluntario ${qVolResult[0].nombreVoluntario}`;
          idUser = data.idVoluntario;
        } else {
          notifValues[1] = "Un administrador";
        }
        notifValues[1] += ` ha confirmado la entrega de la donación COD:  
          ${padNumber(data.idDonacion, 6, "0")}, confirma la recepción`;
        const insertNotifVol = await queryDatabase(qInsert, notifValues);
        console.log(idUser);
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
          el recibo en tus donaciones`;
        const insertNotifUser = await queryDatabase(qInsert, notifValues);
        await queryDatabase(qInsertTieneN, [
          data.idGeneral,
          insertNotifUser.insertId,
        ]);
        await queryDatabase(qInsertTieneN, [
          data.idVoluntario,
          insertNotifUser.insertId,
        ]);
      } else if (data.estado === "Rechazado") {
        notifValues[0] = "Tu donación ha sido rechazada";
        notifValues[1] = `La petición de la donación con COD: 
        ${padNumber(data.idDonacion, 6, "0")} 
        fue rechazada por un administrador`;
        const insertNotifUser = await queryDatabase(qInsert, notifValues);
        await queryDatabase(qInsertTieneN, [
          data.idGeneral,
          insertNotifUser.insertId,
        ]);
      } else if (data.estado === "Cancelado") {
        // si usuario cancela, notificar al voluntario o admin
        if (data.usuarioCancela) {
          notifValues[0] = "Donación cancelada";
          notifValues[1] = `La petición de la donación con COD: 
          ${padNumber(data.idDonacion, 6, "0")} 
          fue cancelada, por el usuario ${qRecResult[0].nombreGeneral}`;
          const insertNotifUser = await queryDatabase(qInsert, notifValues);
          await queryDatabase(qInsertTieneN, [
            data.idVoluntario,
            insertNotifUser.insertId,
          ]);
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
          const insertNotifUser = await queryDatabase(qInsert, notifValues);
          await queryDatabase(qInsertTieneN, [
            data.idGeneral,
            insertNotifUser.insertId,
          ]);
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
