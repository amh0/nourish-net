import { db } from "../connect.js";
export const getAllProducts = (req, res) => {
  //TODO
  const q = "select * from alimento";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.send(data);
    }
  });
};
export const uploadProducts = (req, res) => {
  // TODO
};
