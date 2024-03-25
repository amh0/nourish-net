import { db } from "../connect.js";
export const getAllProducts = (req, res) => {
  //TODO
  const q = "select * from alimento";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
export const uploadProduct = (req, res) => {
  console.log(req.file);
  console.log(req.file.filename);
  console.log(req.body);
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
    (err, resul) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        // res.send("Data inserted");
        res.json({ Status: "OK" });
      }
    }
  );
};
export const uploadUser = (req, res) => {
  // TODO
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  console.log(req.body);
  db.query(
    "insert into user (id, name, lastname) values (?,?,?)",
    [id, name, lastname],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data inserted");
      }
    }
  );
};
