import { Express } from "express";
import { mysql } from "mysql2";
import nodemailer from "nodemailer";
import { database, smtpConfig } from "./config/config.js";
import { cors } from "cors";
import { CryptoJS } from "crypto-js";
import { multer } from "multer";
import { path } from "path";
// const express = require("express");
// const mysql = require("mysql2");
// const nodemailer = require("nodemailer");
// const { database, smtpConfig } = require("./config/config");
// const cors = require("cors");
// const CryptoJS = require("crypto-js");

// const multer = require("multer");
// const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
// img handling
app.use(express.static("upload"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

// const connection = mysql.createConnection(database);
// -----------------
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nourishtest1",
  port: "3307",
});

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

const upload = multer({ storage: storage });

app.post("/uploadimg", upload.single("img"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  const sql = "UPDATE alimento set imagen = ? where id = 3";
  connection.query(sql, [image], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "Success" });
  });
});
app.get("/getimg", (req, res) => {
  connection.query("select * from alimento", (err, result) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(result);
  });
});

app.get("/", (req, res) => {
  return res.json("from backend side");
});
app.get("/getproducts", (req, res) => {
  connection.query("SELECT * FROM ALIMENTO", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/test", (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  connection.query(
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
});

app.post("/additem", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const tipo = req.body.tipo;
  const fecha_vencimiento = req.body.fecha_vencimiento;
  const cantidad = req.body.cantidad;
  const unidad_medida = req.body.unidad_medida;
  const proveedor = req.body.proveedor;
  const imagen = req.body.imagen;
  const idgeneral = req.body.idgeneral;
  //   connection.query(
  //     "insert into alimento (id, nombre, descripcion) values (?,?,?)",
  //     [id, nombre, descripcion],
  //     (err, resul) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send("Data inserted");
  //       }
  //     }
  //   );
  // });
  connection.query(
    `insert into alimento (id, nombre, descripcion, tipo, fecha_vencimiento, cantidad, unidad_medida, proveedor, imagen, idgeneral)
    values (?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      nombre,
      descripcion,
      tipo,
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
app.use("/api/products", productRoutes);
// ---------------------
// app.post("/verify-email", (req, res) => {
//   const email = req.body.email;
//   const existsInDB = req.body.existsInDB;

//   connection.query(
//     "SELECT * FROM usuario WHERE correo = ?",
//     [email],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Error retrieving user data");
//       } else {
//         if (results.length == existsInDB) {
//           const verificationCode = Math.floor(100000 + Math.random() * 900000);
//           const transporter = nodemailer.createTransport(smtpConfig);
//           console.log(verificationCode);
//           const mailOptions = {
//             from: smtpConfig.auth.user,
//             to: email,
//             subject: "NOURISH NET: CÓDIGO DE VERIFICACIÓN",
//             text: `Tu código de verificación es: \n ${verificationCode}`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log(error);
//               res.status(500).send("Error sending verification email");
//             } else {
//               console.log("Verification email sent: " + info.response);
//               console.log("Verification email sent successfully");

//               res.status(200).send({
//                 verificationCode: verificationCode,
//               });
//             }
//           });
//         } else {
//           if (results.length > 0) {
//             console.log("EL CORREO REGISTRADO EN LA BASE DE DATOS");
//             res.status(204).send("Email already exists");
//           } else {
//             console.log("EL CORREO NO REGISTRADO EN LA BASE DE DATOS");
//             res.status(204).send("Email does not exist");
//           }
//         }
//       }
//     }
//   );
// });

// app.post("/verify-email-password", (req, res) => {
//   const { email, password } = req.body;

//   const query = "SELECT * FROM usuario WHERE correo = ?";
//   connection.query(query, [email], (err, results) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       res.status(500).send("Error retrieving user data");
//       return;
//     }

//     if (results.length > 0) {
//       const user = results[0];
//       const passwordDB = user.contrasenia;
//       const decryptedPasswordBytes = CryptoJS.AES.decrypt(passwordDB, "key");
//       const decryptedPassword = decryptedPasswordBytes.toString(
//         CryptoJS.enc.Utf8
//       );

//       if (decryptedPassword === password) {
//         console.log("Email and password are correct");
//         res.status(200).json({ verificationResult: "correct" });
//       } else {
//         console.log("Incorrect password");
//         res.status(200).json({ verificationResult: "incorrectPassword" });
//       }
//     } else {
//       console.log("Email not found");
//       res.status(200).json({ verificationResult: "emailNotFound" });
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   const { email, encPassword } = req.body;
//   const newUser = { email, encPassword };
//   connection.query(
//     "INSERT INTO usuario(correo, contrasenia, img_perfil) VALUES(?,?, NULL)",
//     [email, encPassword],
//     (err, result) => {
//       if (err) {
//         console.error("Error al insertar usuario:", err);
//         res.status(500).json({ error: "Error al registrar usuario" });
//       } else {
//         console.log("Successfully registered user");
//         res.status(200).json({ success: true });
//       }
//     }
//   );
// });

// app.post("/update-password", (req, res) => {
//   const { email, encPassword } = req.body;

//   connection.query(
//     "UPDATE usuario SET contrasenia = ? WHERE correo = ?",
//     [encPassword, email],
//     (err, results) => {
//       if (err) {
//         console.error("Error updating password:", err);
//       } else {
//         console.log("Password updated successfully");
//       }
//     }
//   );
// });
