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

export const getAllProducts = (req, res) => {
  const q = "select * from alimento";
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
      data.idGeneral,
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

export const uploadProduct2 = (req, res) => {
  console.log(req.file);
  console.log(req.file.filename);
  console.log(req.body);
  // alimento
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const fecha_vencimiento = req.body.fecha_vencimiento;
  const fecha_publicacion = req.body.fecha_publicacion;
  const cantidad = req.body.cantidad;
  const unidad_medida = req.body.unidad_medida;
  const imagen = req.file.filename;
  const q = `insert into alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
    values (?,?,?,?,?,?,?,?,?)`;
  db.query(
    q,
    [
      nombre,
      descripcion,
      "Disponible",
      fecha_vencimiento,
      fecha_publicacion,
      cantidad,
      unidad_medida,
      imagen,
      null,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        // res.send("Data inserted");
        res.json({ Status: "OK" });
      }
    }
  );
  // obtener id
  // con nombre y fecha_publicacion

  const id = 0;

  // categoria
  const categorias = req.body.categoria;
  const q_cat = `insert into tiene_c (idalimento, idcategoria) values `;
  categorias.forEach((element) => {
    // concatenar al query
  });
  // db.query
};

export const uploadUser = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  console.log(req.body);
  db.query(
    "insert into user (id, name, lastname) values (?,?,?)",
    [id, name, lastname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data inserted");
      }
    }
  );
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
