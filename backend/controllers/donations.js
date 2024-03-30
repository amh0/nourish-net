import { db } from "../connect.js";
export const insertDonation = async (req, res) => {
  const data = req.body;
  try {
    const q = `insert into donacion (tipo_envio, estado, fecha_entrega, hora_entrega, 
               mensaje_solicitud, cantidad_donacion, idgeneral, idalimento, idvoluntario) values(?,?,?,?,?,?,?,?,?)`;
    const donationValues = [
      data.tipo_envio,
      data.estado,
      data.fecha_entrega,
      data.hora_entrega,
      data.mensaje_solicitud,
      data.cantidad_donacion,
      data.idgeneral,
      data.idalimento,
      null,
    ];
    await queryDatabase(q, donationValues);
    res.status(200).json({ Status: "OK" });
  } catch (error) {
    res.status(500).json(error);
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
