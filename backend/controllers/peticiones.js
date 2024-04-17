import { db } from "../connect.js";

export const getPeticiones = (req, res) => {
  const q = `
            SELECT p.fecha_publicacion, p.idpeticion, p.prioridad, p.idusuario, u.img_perfil,
            obtenerNombreUs(u.idusuario) nombre, p.titulo, p.ubicacion,
            p.descripcion, p.imagen, p.fecha_publicacion, p.contacto
            FROM peticion p
            INNER JOIN usuario u ON p.idusuario = u.idusuario
            ORDER BY 
            CASE p.prioridad
            WHEN 'Urgente' THEN 1
            WHEN 'Alta' THEN 2
            WHEN 'Media' THEN 3
            WHEN 'Baja' THEN 4
            WHEN 'Permanente/Continua' THEN 5
            ELSE 6 
            END,
            p.fecha_publicacion DESC;
    `;
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

export const uploadPeticion = async (req, res) => {
  // console.log(req.file);
  // console.log(req.file.filename);
  // console.log(req.body);
  const data = req.body;
  const imagen = req.file.filename;

  // console.log(data);
  // console.log(imagen);
  const q = `INSERT INTO PETICION (titulo, descripcion, ubicacion, contacto, imagen, prioridad, idusuario, fecha_publicacion)
    VALUES (?,?,?,?,?,?,?,?)`;

  const peticionValues = [
    data.titulo,
    data.descripcion,
    data.ubicacion,
    data.contacto,
    imagen,
    data.prioridad,
    data.idusuario,
    data.fecha_publicacion,
  ];

  db.query(q, peticionValues, (err, data) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json(err);
    } else {
      console.log("OK");
      res.status(200).json(data);
    }
  });
};
