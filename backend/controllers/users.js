import { db } from "../connect.js";

export const getVolunteers = async (req, res) => {
  try {
    const q =
      "select *, concat(nombre, ' ',apellido_pat , ' ',apellido_mat) as nombreCompleto from voluntario";
    const queryResult = await queryDatabase(q);
    res.status(200).json(queryResult);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
