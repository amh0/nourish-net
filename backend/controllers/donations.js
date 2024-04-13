import { query } from "express";
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
    const q = `update donacion set estado = ?, conf_donante = ?, conf_receptor = ? where iddonacion = ?`;
    const donationValues = [
      data.estado,
      data.conf_donante,
      data.conf_receptor,
      data.iddonacion,
    ];
    const result = await queryDatabase(q, donationValues);
    if (
      data.estado === "Entregado" &&
      data.conf_donante &&
      data.conf_receptor
    ) {
      const qUpd = `update alimento
      set cantidad_reservada = cantidad_reservada -  ?,
        cantidad_no_disponible = cantidad_no_disponible + ?
      where idalimento = ? `;
      const updValues = [
        data.cantidad_donacion,
        data.cantidad_donacion,
        data.idalimento,
      ];
      await queryDatabase(qUpd, updValues);
    } else if (data.estado === "Cancelado" || data.estado === "Rechazado") {
      const qUpd = `update alimento
      set cantidad_reservada = cantidad_reservada -  ?,
        cantidad_disponible = cantidad_disponible + ?
      where idalimento = ? `;
      const updValues = [
        data.cantidad_donacion,
        data.cantidad_donacion,
        data.idalimento,
      ];
      await queryDatabase(qUpd, updValues);
    }
    res.status(200).json(result);
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
      console.log(err);
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

export const addToCart = async (req, res) => {
  const data = req.body;
  try {
    // database verification to check the maximum available quantity of the product
    const qMax =
      "select cantidad_disponible from alimento where idalimento = ?";
    const maxQty = await queryDatabase(qMax, [data.idalimento]);
    console.log(maxQty);
    // verify if donation already has product
    const q = "select * from tiene_a where iddonacion = ? and idalimento = ?";
    const queryResult = await queryDatabase(q, [
      data.iddonacion,
      data.idalimento,
    ]);
    if (queryResult.length > 0) {
      // product is already in the cart, update the quantity
      const qUpd = `update tiene_a 
        set cantidad = least(?, cantidad + ?)
        where iddonacion = ? and idalimento = ?`;
      await queryDatabase(qUpd, [
        maxQty[0].cantidad_disponible,
        data.cantidad,
        data.iddonacion,
        data.idalimento,
      ]);
    } else {
      // product is not in the cart, add it
      const qInsert =
        "insert into tiene_a (iddonacion, idalimento, cantidad) values (?,?, least(?,?))";
      await queryDatabase(qInsert, [
        data.iddonacion,
        data.idalimento,
        maxQty[0].cantidad_disponible,
        data.cantidad,
      ]);
    }
    res.status(200).json({ Status: "OK" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
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
    const insertResult = await queryDatabase(q, donationValues);
    const qUpd = `update alimento 
      set cantidad_disponible = cantidad_disponible - ?,
        cantidad_reservada = cantidad_reservada + ?
      where idalimento = ? `;
    const valuesUpd = [
      data.cantidad_donacion,
      data.cantidad_donacion,
      data.idalimento,
    ];
    const updResult = await queryDatabase(qUpd, valuesUpd);
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
