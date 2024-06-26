import { db } from "../connect.js";

export const getCategories = (req, res) => {
  const q = "select * from categoria";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

export const getCategoriesProdX = (req, res) => {
  const data = req.body;
  const idalimento = data.idalimento;
  const q =
    "select c.nombre_cat from categoria c inner join tiene_c t on c.idcategoria = t.idcategoria where t.idalimento = ?";
  db.query(q, [idalimento], (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
export const getDonnor = async (req, res) => {
  const data = req.body;
  const idgeneral = data.idgeneral;
  try {
    // organizacion
    const q1 = `select * from organizacion where idorg = ?`;
    const queryValues = [idgeneral];
    const orgQuery = await queryDatabase(q1, queryValues);
    if (orgQuery.length > 0) {
      // console.log(orgQuery);
      res.status(200).json(orgQuery);
    } else {
      // buscar persona
      const q2 = `select *, concat(nombre, ' ', apellido_pat, ' ', apellido_mat) as nombre from persona where idpersona = ?`;
      const perQuery = await queryDatabase(q2, queryValues);
      res.status(200).json(perQuery);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
export const getAllProductsNoFunctions = async (req, res) => {
  try {
    // obtener tipo de organizacion
    const qType = `
    select a.*, o.nombre as nombre_don, o.direccion as direccion_don
    from alimento a inner join general g 
    on a.idgeneral = g.idgeneral
    inner join organizacion o
    on g.idgeneral = o.idorg
    where g.tipo like 'Organizacion' 
      and (a.estado like 'Disponible'
      or a.estado like 'No disponible')
    UNION
    select a.*,  concat(p.nombre, ' ', p.apellido_pat, ' ', p.apellido_mat) as nombre_don, p.direccion as direccion_don  
    from alimento a inner join general g 
    on a.idgeneral = g.idgeneral
    inner join persona p
    on g.idgeneral like p.idpersona
    where g.tipo = 'Persona'
      and (a.estado like 'Disponible'
      or a.estado like 'No disponible')
    order by 7 desc`;
    const foodQuery = await queryDatabase(qType);
    res.status(200).json(foodQuery);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // obtener tipo de organizacion
    const qType = `
    select prod.* , cat.categorias
    from (select a.*, nombre_voluntario_x(a.idvoluntario) as nombreVoluntario, o.nombre as nombre_don, o.direccion as direccion_don
      from alimento a inner join general g 
      on a.idgeneral = g.idgeneral
      inner join organizacion o
      on g.idgeneral = o.idorg
      where g.tipo like 'Organizacion' 
        and (a.estado like 'Disponible'
        or a.estado like 'No disponible')
      UNION
      select a.*, nombre_voluntario_x(a.idvoluntario) as nombreVoluntario, concat(p.nombre, ' ', p.apellido_pat, ' ', p.apellido_mat) as nombre_don, p.direccion as direccion_don  
      from alimento a inner join general g 
      on a.idgeneral = g.idgeneral
      inner join persona p
      on g.idgeneral like p.idpersona
      where g.tipo = 'Persona'
        and (a.estado like 'Disponible'
        or a.estado like 'No disponible')
      order by 7 desc) prod 
    left join (
      SELECT idalimento, GROUP_CONCAT(idcategoria) as categorias
      from tiene_c
      group by idalimento) cat
    on prod.idalimento = cat.idalimento`;
    const foodQuery = await queryDatabase(qType);
    res.status(200).json(foodQuery);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const uploadProduct = async (req, res) => {
  const data = req.body;
  const imagen = req.file.filename;
  try {
    // alimento
    const q = `insert into alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad_disponible, unidad_medida, imagen, idgeneral)
    values (?,?,?,?,?,?,?,?,?)`;
    const foodValues = [
      data.nombre,
      data.descripcion,
      "No asignado",
      data.fecha_vencimiento,
      data.fecha_publicacion,
      data.cantidad,
      data.unidad_medida,
      imagen,
      data.idgeneral,
    ];
    const insertResult = await queryDatabase(q, foodValues);
    const foodId = insertResult.insertId;
    // adicionar categorias
    const categorias = req.body.categoria;
    let qCategoria = `insert into tiene_c (idalimento, idcategoria) values`;
    categorias.forEach((cat, i) => {
      qCategoria += " (" + foodId + ", " + cat + ")";
      if (i < categorias.length - 1) {
        qCategoria += ",";
      } else {
        qCategoria += ";";
      }
    });
    await queryDatabase(qCategoria);
    res.status(200).json({ Status: "OK" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const updateEvaluation = async (req, res) => {
  const data = req.body;
  try {
    const q = `update alimento set evaluacion = ?, idvoluntario = ? where idalimento = ?`;
    const donationValues = [
      data.evaluacion,
      data.idVoluntario,
      data.idAlimento,
    ];
    const result = await queryDatabase(q, donationValues);
    res.status(200).json(result);
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
