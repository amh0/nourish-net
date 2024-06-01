import { db } from "../connect.js";

export const allCategories = (req, res) => {
  const sql = ` SELECT * 
                  FROM categoria
                  ORDER BY nombre_cat;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

export const allFood = (req, res) => {
  const sql = ` SELECT * 
                FROM alimento
                ORDER BY nombre;`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

export const categoryX = (req, res) => {
  const sql = `
    SELECT *
    FROM categoria c
    INNER JOIN tiene_c tc ON c.idcategoria = tc.idcategoria
    INNER JOIN alimento a ON tc.idalimento = a.idalimento
    WHERE a.cantidad_disponible > 0
    AND not a.evaluacion like 'No evaluado'
    ORDER BY nombre;
      `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      console.log(results);
      res.json(results);
    }
  });
};
