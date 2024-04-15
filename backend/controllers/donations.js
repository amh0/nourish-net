import { db } from "../connect.js";

export const addToCart = async (req, res) => {
  const data = req.body;
  try {
    let rowAdded = false;
    // database verification to check the maximum available quantity of the product
    const qMax =
      "select cantidad_disponible from alimento where idalimento = ?";
    const maxQty = await queryDatabase(qMax, [data.idAlimento]);
    // verify if donation already has product
    const q = "select * from tiene_a where iddonacion = ? and idalimento = ?";
    const queryResult = await queryDatabase(q, [
      data.idDonacion,
      data.idAlimento,
    ]);
    if (queryResult.length > 0) {
      // product is already in the cart, update the quantity
      const qUpd = `update tiene_a 
        set cantidad = least(?, cantidad + ?)
        where iddonacion = ? and idalimento = ?`;
      await queryDatabase(qUpd, [
        maxQty[0].cantidad_disponible,
        data.cantidad,
        data.idDonacion,
        data.idAlimento,
      ]);
    } else {
      // product is not in the cart, add it
      const qInsert =
        "insert into tiene_a (iddonacion, idalimento, cantidad, fecha_agregado) values (?,?, least(?,?), ?)";
      await queryDatabase(qInsert, [
        data.idDonacion,
        data.idAlimento,
        maxQty[0].cantidad_disponible,
        data.cantidad,
        data.fechaAgregado,
      ]);
      rowAdded = true;
    }
    res.status(200).json({ Status: "OK", rowAdded: rowAdded });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getDonationProducts = async (req, res) => {
  const data = req.body;
  try {
    const q = `select a.idalimento, a.nombre, t.cantidad, a.unidad_medida, nombre_idx_gen(g.idgeneral) as nombreDonante,
     a.imagen, t.fecha_agregado, t.iddonacion
    from tiene_a t
    inner join alimento a
    on t.idalimento = a.idalimento 
    inner join general g
    on a.idgeneral = g.idgeneral 
    where iddonacion = ?
    order by t.fecha_agregado`;
    const queryResult = await queryDatabase(q, [data.idDonacion]);
    res.status(200).json(queryResult);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const requestDonation = async (req, res) => {
  const data = req.body;
  try {
    // actualizar datos donacion y asignar estado solicitado
    const q = `update donacion 
    set tipo_envio = ?, estado = ?, fecha_entrega = ?, hora_entrega = ?, 
      lugar_entrega = ?, mensaje_solicitud = ?, fecha_solicitud = ?
    where iddonacion = ? and idgeneral = ?`;
    const donationValues = [
      data.tipoEnvio,
      data.estado,
      data.fechaEntrega,
      data.horaEntrega,
      data.lugarEntrega,
      data.mensajeSolicitud,
      data.fechaSolicitud,
      data.idDonacion,
      data.idGeneral,
    ];
    // actualizar cantidades de los alimentos seleccionados
    await queryDatabase(q, donationValues);
    const qProd = `select t.* 
    from tiene_a t
    inner join alimento a
    on t.idalimento = a.idalimento 
    where iddonacion = ?`;
    const resultProd = await queryDatabase(qProd, [data.idDonacion]);
    let qUpd = "";
    resultProd.forEach((element) => {
      qUpd += `update alimento set cantidad_disponible = cantidad_disponible - ${element.cantidad},
       cantidad_reservada = cantidad_reservada + ${element.cantidad} 
       where idalimento = ${element.idalimento};`;
    });
    await queryDatabase(qUpd);
    // asignar un nuevo carrito
    const cartQuery = "insert into donacion (idgeneral, estado) values (?, ?)";
    const cartValues = [data.idGeneral, "Inactivo"];
    const cartResult = await queryDatabase(cartQuery, cartValues);
    const idCart = cartResult.insertId;
    res.status(200).json({ Status: "OK", idCarrito: idCart });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const removeProduct = async (req, res) => {
  const data = req.body;
  try {
    const q = "delete from tiene_a where iddonacion = ? and idalimento = ?";
    const queryResult = await queryDatabase(q, [
      data.idDonacion,
      data.idAlimento,
    ]);
    res.status(200).json(queryResult);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getDonationDetails = async (req, res) => {
  const data = req.body;
  try {
    const qDonation = `
      select d.tipo_envio as tipoEnvio, d.iddonacion as idDonacion,  
        d.lugar_entrega as lugarEntrega, d.fecha_entrega as fechaEntrega, d.hora_entrega as horaEntrega, 
        d.mensaje_solicitud as mensajeSolicitud, d.idgeneral as idGeneral, d.idvoluntario as idVoluntario,
        nombre_voluntario_x(d.idvoluntario) as nombreVoluntario, 
        direccion_voluntario_x(d.idvoluntario) as direccionVoluntario, 
        celular_voluntario_x(d.idvoluntario) as celularVoluntario,
        nombre_idx_gen(d.idgeneral) nombreGeneral, direccion_idx_gen(d.idgeneral) as direccionGeneral, 
        cel_idx_gen(d.idgeneral) as celularGeneral
      from donacion d
      where d.iddonacion = ?`;
    const resReceipt = await queryDatabase(qDonation, [data.idDonacion]);
    res.status(200).json(resReceipt);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  const data = req.body;
  try {
    const q = `update donacion set estado = ?, conf_receptor = ?, conf_voluntario = ? where iddonacion = ?`;
    const donationValues = [
      data.estado,
      data.confReceptor,
      data.confVoluntario,
      data.idDonacion,
    ];
    const result = await queryDatabase(q, donationValues);
    // Update quantity of products
    if (
      (data.estado === "Entregado" &&
        data.confReceptor &&
        data.confVoluntario) ||
      data.estado === "Cancelado" ||
      data.estado === "Rechazado"
    ) {
      // obtener todos los alimentos
      const q = `select a.idalimento as idAlimento, t.cantidad, t.iddonacion as idDonacion
        from tiene_a t
        inner join alimento a
        on t.idalimento = a.idalimento
        where iddonacion = ?`;
      const allProducts = await queryDatabase(q, [data.idDonacion]);
      console.log("actualizando...");
      console.log(allProducts);
      if (
        data.estado === "Entregado" &&
        data.confReceptor &&
        data.confVoluntario
      ) {
        // alimentos fueron entregados, actualizar cantidad no disponible
        let qUpd = "";
        allProducts.forEach((product) => {
          qUpd += `update alimento
            set cantidad_reservada = cantidad_reservada -  ${product.cantidad},
              cantidad_no_disponible = cantidad_no_disponible + ${product.cantidad}
            where idalimento = ${product.idAlimento};\n `;
        });
        await queryDatabase(qUpd);
      } else if (data.estado === "Cancelado" || data.estado === "Rechazado") {
        // alimentos fueron cancelados, actualizar cantidad disponible
        let qUpd = "";
        allProducts.forEach((product) => {
          qUpd += `update alimento
            set cantidad_reservada = cantidad_reservada -  ${product.cantidad},
              cantidad_disponible = cantidad_disponible + ${product.cantidad}
            where idalimento = ${product.idAlimento};\n `;
        });
        await queryDatabase(qUpd);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllDonations = (req, res) => {
  const q = `
    select d.iddonacion as idDonacion, d.estado, d.tipo_envio as tipoEnvio, d.fecha_solicitud as fechaSolicitud,
      d.fecha_entrega as fechaEntrega, d.hora_entrega as horaEntrega, d.lugar_entrega as lugarEntrega,
      d.mensaje_solicitud as MensajeSolicitud, d.idgeneral as idGeneral, d.idvoluntario as idVoluntario,
      d.conf_receptor as confReceptor, d.conf_voluntario as confVoluntario, 
      nombre_voluntario_x(d.idvoluntario) as nombreVoluntario, direccion_voluntario_x(d.idvoluntario) as direccionVoluntario,
      nombre_idx_gen(d.idgeneral) nombreGeneral, direccion_idx_gen(d.idgeneral) as direccionGeneral, tmp.cantAlim 
    from donacion d
    inner join (
      select iddonacion, count(idalimento) as cantAlim
      from tiene_a
      group by iddonacion
      ) as tmp
    on d.iddonacion = tmp.iddonacion
    where d.estado not like 'Inactivo'
    order by d.fecha_solicitud desc
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

export const getDonationsUser = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const q = `
    select d.iddonacion as idDonacion, d.estado, d.tipo_envio as tipoEnvio,
      d.fecha_entrega as fechaEntrega, d.hora_entrega as horaEntrega, d.lugar_entrega as lugarEntrega,
      d.mensaje_solicitud as mensajeSolicitud, d.idgeneral as idGeneral, d.idvoluntario as idVoluntario,
      d.conf_receptor as confReceptor, d.conf_voluntario as confVoluntario, 
      nombre_voluntario_x(d.idvoluntario) as nombreVoluntario, direccion_voluntario_x(d.idvoluntario) as direccionVoluntario,
      nombre_idx_gen(d.idgeneral) nombreGeneral, direccion_idx_gen(d.idgeneral) as direccionGeneral, tmp.cantAlim
    from donacion d
    inner join (
      select iddonacion, count(idalimento) as cantAlim
      from tiene_a
      group by iddonacion
      ) as tmp
    on d.iddonacion = tmp.iddonacion
    where d.estado not like 'Inactivo'
      and d.idgeneral = ?
    order by d.fecha_solicitud desc`;
    const userValue = [data.idUsuario];
    const donationsRes = await queryDatabase(q, userValue);
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

export const assignVolunteer = async (req, res) => {
  const data = req.body;
  try {
    const q = `
    update donacion set idvoluntario = ? where iddonacion = ?`;
    const donationValues = [data.idVoluntario, data.idDonacion];
    const donationsRes = await queryDatabase(q, donationValues);
    res.status(200).json(donationsRes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const insertReceipt = async (req, res) => {
  const data = req.body;
  try {
    const q = `insert into recibo (fecha, nota, iddonacion) values (?,?,?)`;
    const donationValues = [data.fecha, data.nota, data.idDonacion];
    const receiptResult = await queryDatabase(q, donationValues);
    res.status(200).json(receiptResult.data);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getReceiptData = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const qProducts = `select a.idalimento, a.nombre, t.cantidad, a.unidad_medida as unidadMedida, 
    nombre_idx_gen(g.idgeneral) as nombreDonante, t.iddonacion
    from tiene_a t
    inner join alimento a
    on t.idalimento = a.idalimento 
    inner join general g
    on a.idgeneral = g.idgeneral 
    where iddonacion = ?
    order by t.fecha_agregado`;
    const resProducts = await queryDatabase(qProducts, [data.idDonacion]);
    const qReceipt = `
      select r.idrecibo as idRecibo, r.fecha, r.nota, d.tipo_envio as tipoEnvio, d.iddonacion as idDonacion,  
        d.lugar_entrega as lugarEntrega, d.fecha_entrega as fechaEntrega, d.hora_entrega as horaEntrega, 
        d.mensaje_solicitud as mensajeSolicitud, d.idgeneral as idGeneral, d.idvoluntario as idVoluntario,
        nombre_voluntario_x(d.idvoluntario) as nombreVoluntario, direccion_voluntario_x(d.idvoluntario) as direccionVoluntario,
        celular_voluntario_x(d.idvoluntario) as celularVoluntario,
        nombre_idx_gen(d.idgeneral) nombreGeneral, direccion_idx_gen(d.idgeneral) as direccionGeneral, 
        cel_idx_gen(d.idgeneral) as celularGeneral
      from donacion d
      inner join recibo r
      on d.iddonacion = r.iddonacion
      where r.iddonacion = ?`;
    const resReceipt = await queryDatabase(qReceipt, [data.idDonacion]);
    res.status(200).json({ receipt: resReceipt, products: resProducts });
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
