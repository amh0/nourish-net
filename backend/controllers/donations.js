import { db } from "../connect.js";

export const insertReceipt = async (req, res) => {
  const data = req.body;
  try {
    const q = `insert into recibo (fecha, nota, iddonacion) values (?,?,?)`;
    const donationValues = [data.fecha, data.nota, data.iddonacion];
    const receiptResult = await queryDatabase(q, donationValues);
    const idrecibo = receiptResult.insertId;
    // console.log(receiptResult);
    // console.log(idrecibo);
    const q2 = `
    select r.*, don.idgeneral as nombre_don, rec.idgeneral as nombre_rec, 
        a.nombre as nombre_ali, a.unidad_medida as unidad,  
         d.cantidad_donacion, d.fecha_entrega, d.hora_entrega
    from recibo r 
    inner join donacion d 
    on r.iddonacion = d.iddonacion
    inner join alimento a
    on d.idalimento = a.idalimento
    inner join general don 
    on d.idgeneral = don.idgeneral
    inner join general rec
    on a.idgeneral = rec.idgeneral
    where r.idrecibo = ?`;
    const receiptValues = [idrecibo];
    const receiptResultData = await queryDatabase(q2, receiptValues);
    // console.log(receiptResultData);
    res.status(200).json(receiptResultData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getReceiptData = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const q = `
    select r.*, don.idgeneral as nombre_don, rec.idgeneral as nombre_rec, 
        a.nombre as nombre_ali, a.unidad_medida as unidad,  
         d.cantidad_donacion, d.fecha_entrega, d.hora_entrega
    from recibo r 
    inner join donacion d 
    on r.iddonacion = d.iddonacion
    inner join alimento a
    on d.idalimento = a.idalimento
    inner join general don 
    on d.idgeneral = don.idgeneral
    inner join general rec
    on a.idgeneral = rec.idgeneral
    where r.iddonacion = ?`;
    const donationValues = [data.iddonacion];
    const receiptResult = await queryDatabase(q, donationValues);
    res.status(200).json(receiptResult);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
/*
  select r.*, don.idgeneral as nombre_don, rec.idgeneral as nombre_rec, 
      a.nombre as nombre_ali, a.unidad as unidad, d.iddonacion, 
      d.fecha_entrega, d.hora_entrega
  from recibo r 
  inner join donacion d 
  on r.iddonacion = d.iddonacion
  inner join alimento a
  on d.idalimento = a.idalimento
  inner join general don 
  on d.idgeneral = don.idgeneral
  inner join general rec
  on a.idgeneral = rec.idgeneral
  where r.idrecibo = ?
*/

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
