const express = require("express");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload/img");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
router.get("/testing", (req, res) => {
  res.send("it works!");
});

router.post("/upload", upload.single("img"), (req, res) => {
  console.log(req.file);
  const imagen = req.file.filename;

  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  const fecha_vencimiento = req.body.fecha_vencimiento;
  const cantidad = req.body.cantidad;
  const unidad_medida = req.body.unidad_medida;
  const proveedor = req.body.proveedor;
  const idgeneral = req.body.idgeneral;
  const sqlQuery = `insert into alimento (nombre, descripcion, tipo, fecha_vencimiento, cantidad, unidad_medida, proveedor, imagen, idgeneral)
    values (?,?,?,?,?,?,?,?,?,?)`;
  connection.query(
    sqlQuery,
    [
      nombre,
      descripcion,
      estado,
      fecha_vencimiento,
      cantidad,
      unidad_medida,
      proveedor,
      imagen,
      idgeneral,
    ],
    (err, resul) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Data inserted");
      }
    }
  );
});
module.exports = router;
