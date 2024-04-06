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
      const q2 = `select * from persona where idpersona = ?`;
      const perQuery = await queryDatabase(q2, queryValues);
      res.status(200).json(orgQuery);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllProducts = (req, res) => {
  const q =
    "select a.*, o.nombre as organizacion, o.direccion from alimento a inner join organizacion o on a.idgeneral = o.idorg order by a.idalimento";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

export const uploadProduct = async (req, res) => {
  // console.log(req.file);
  // console.log(req.file.filename);
  // console.log(req.body);
  const data = req.body;
  const imagen = req.file.filename;
  try {
    // alimento
    const q = `insert into alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
    values (?,?,?,?,?,?,?,?,?)`;
    const foodValues = [
      data.nombre,
      data.descripcion,
      "Disponible",
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
