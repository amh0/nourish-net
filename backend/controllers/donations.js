import { db } from "../connect.js";

export const updateStatus = async (req, res) => {
  const data = req.body;
  try {
    const q = `update donacion set estado = ? where iddonacion = ?`;
    const donationValues = [data.estado, data.iddonacion];
    await queryDatabase(q, donationValues);
    res.status(200).json({ Status: "OK" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllDonations = (req, res) => {
  const q = `
    select d.*, a.nombre as nombre_alimento, a.imagen, a.unidad_medida, grec.nombre as nombre_receptor, grec.direccion as direccion_receptor  
    from donacion d 
    inner join alimento a 
    on d.idalimento = a.idalimento
    inner join organizacion grec 
    on d.idgeneral = grec.idorg
    order by d.iddonacion
    `;
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
/*
`
select d.*, a.nombre as nombre_alimento, a.imagen, a.unidad_medida, grec.nombre as nombre_receptor, grec.direccion as direccion_receptor  
from donacion d 
inner join alimento a 
on d.idalimento = a.idalimento
inner join organizacion grec 
on d.idgeneral = grec.idorg
`
*/
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
