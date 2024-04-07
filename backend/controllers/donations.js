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
    select r.*, 
      nombre_idx_gen(d.idgeneral) as nombre_rec, direccion_idx_gen(d.idgeneral) as direccion_rec, cel_idx_gen(d.idgeneral) as cel_rec,
      nombre_idx_gen(a.idgeneral) as nombre_don, direccion_idx_gen(a.idgeneral) as direccion_don, cel_idx_gen(a.idgeneral) as cel_don,
      a.nombre as nombre_ali, a.unidad_medida, d.cantidad_donacion, d.fecha_entrega, d.hora_entrega
    from recibo r 
    inner join donacion d 
    on r.iddonacion = d.iddonacion
    inner join alimento a
    on d.idalimento = a.idalimento
    where r.iddonacion = ?`;
    const donationValues = [data.iddonacion];
    const receiptResult = await queryDatabase(q, donationValues);
    res.status(200).json(receiptResult);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
export const getReceiptDataOld = async (req, res) => {
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

export const getAllDonations2 = (req, res) => {
  const q = `
    select d.*, a.nombre as nombre_alimento, a.imagen as img_alimento, a.unidad_medida,
      d.idgeneral as id_receptor, nombre_idx_gen(d.idgeneral) as nombre_rec,
      direccion_idx_gen(d.idgeneral) as direccion_rec, cel_idx_gen(d.idgeneral) as cel_rec,
      a.idgeneral as id_donante, nombre_idx_gen(a.idgeneral) as nombre_don, 
      direccion_idx_gen(a.idgeneral) as direccion_don, cel_idx_gen(a.idgeneral) as cel_don
    from donacion d 
    inner join alimento a 
    on d.idalimento = a.idalimento
    order by d.iddonacion`;
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

export const getDonationsReceived = async (req, res) => {
  const data = req.body;
  try {
    const q = `
    select d.*, a.nombre as nombre_alimento, a.imagen as img_alimento, a.unidad_medida,
      nombre_idx_gen(d.idgeneral) as nombre_rec, direccion_idx_gen(d.idgeneral) as direccion_rec, cel_idx_gen(d.idgeneral) as cel_rec,
      nombre_idx_gen(a.idgeneral) as nombre_don, direccion_idx_gen(a.idgeneral) as direccion_don, cel_idx_gen(a.idgeneral) as cel_don
    from donacion d 
    inner join alimento a 
    on d.idalimento = a.idalimento
    where d.idgeneral = ?
    order by d.iddonacion`;
    const donationValues = [data.idgeneral];
    const donationsRes = await queryDatabase(q, donationValues);
    res.status(200).json(donationsRes);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getDonationsGiven = async (req, res) => {
  const data = req.body;
  try {
    const q = `
    select d.*, a.nombre as nombre_alimento, a.imagen as img_alimento, a.unidad_medida,
      nombre_idx_gen(d.idgeneral) as nombre_rec, direccion_idx_gen(d.idgeneral) as direccion_rec, cel_idx_gen(d.idgeneral) as cel_rec,
      nombre_idx_gen(a.idgeneral) as nombre_don, direccion_idx_gen(a.idgeneral) as direccion_don, cel_idx_gen(a.idgeneral) as cel_don
    from donacion d 
    inner join alimento a 
    on d.idalimento = a.idalimento
    where a.idgeneral = ?
    order by d.iddonacion`;
    const donationValues = [data.idgeneral];
    const donationsRes = await queryDatabase(q, donationValues);
    res.status(200).json(donationsRes);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
/*
drop function if exists nombre_idx_gen;

delimiter //
create function nombre_idx_gen(idx int)
returns varchar(100)
deterministic
begin
  declare xnombre varchar(100);
  declare xtipo varchar(20);
  select tipo into xtipo
  from general
  where idgeneral = idx;
  if xtipo like 'Persona'  then
    select concat(nombre, ' ', apellido_pat, ' ', apellido_mat) into xnombre
    from persona
    where idpersona = idx;
  else
    select nombre into xnombre
    from organizacion
    where idorg = idx;
  end if;
  return xnombre;
end//
delimiter ;

delimiter //
create function direccion_idx_gen(idx int) returns varchar(100)
deterministic
begin
  declare xdireccion varchar(100);
  declare xtipo varchar(20);
  select tipo into xtipo
  from general
  where idgeneral = idx;
  if xtipo like 'Persona'  then
    select direccion into xdireccion
    from persona
    where idpersona = idx;
  else
    select direccion into xdireccion
    from organizacion
    where idorg = idx;
  end if;
  return xdireccion;
end//
delimiter ;

*/
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
