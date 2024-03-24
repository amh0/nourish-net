const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const { database, smtpConfig } = require("./config/config");
const cors = require("cors");
const CryptoJS = require("crypto-js");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(database);

app.post("/verify-email", (req, res) => {
  const email = req.body.email;
  const existsInDB = req.body.existsInDB;

  connection.query(
    "SELECT * FROM usuario WHERE correo = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving user data");
      } else {
        if (results.length == existsInDB) {
          const verificationCode = Math.floor(100000 + Math.random() * 900000);
          const transporter = nodemailer.createTransport(smtpConfig);
          console.log(verificationCode);
          const mailOptions = {
            from: smtpConfig.auth.user,
            to: email,
            subject: "NOURISH NET: CÓDIGO DE VERIFICACIÓN",
            text: `Tu código de verificación es: \n ${verificationCode}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).send("Error sending verification email");
            } else {
              console.log("Verification email sent: " + info.response);
              console.log("Verification email sent successfully");

              res.status(200).send({
                verificationCode: verificationCode,
              });
            }
          });
        } else {
          if (results.length > 0) {
            console.log("EL CORREO REGISTRADO EN LA BASE DE DATOS");
            res.status(204).send("Email already exists");
          } else {
            console.log("EL CORREO NO REGISTRADO EN LA BASE DE DATOS");
            res.status(204).send("Email does not exist");
          }
        }
      }
    }
  );
});

app.post("/verify-email-password", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM usuario WHERE correo = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).send("Error retrieving user data");
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      const passwordDB = user.contrasenia;
      const decryptedPasswordBytes = CryptoJS.AES.decrypt(passwordDB, "key");
      const decryptedPassword = decryptedPasswordBytes.toString(
        CryptoJS.enc.Utf8
      );

      if (decryptedPassword === password) {
        console.log("Email and password are correct");
        res.status(200).json({ verificationResult: "correct" });
      } else {
        console.log("Incorrect password");
        res.status(200).json({ verificationResult: "incorrectPassword" });
      }
    } else {
      console.log("Email not found");
      res.status(200).json({ verificationResult: "emailNotFound" });
    }
  });
});

app.post("/register", (req, res) => {
  // const { email, encPassword } = req.body;
  const formData = req.body.formdata;
  console.log(JSON.stringify(formData));

  // console.log("]]]]]]]]]");
  // console.log(formData.isReceiver);

  // console.log(JSON.stringify(formData.isDonor));
  // console.log("=====" + formData.isDonor);
  let userId = 0;

  connection.query(
    "INSERT INTO usuario(correo, contrasenia, img_perfil) VALUES(?,?, NULL)",
    [formData.email, formData.encPassword],
    (err, result) => {
      // connection.query("INSERT INTO usuario(correo, contrasenia, img_perfil) VALUES(?,?, NULL)", [email,encPassword], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Error registering user" });
      } else {
        userId = result.insertId;
        console.log("org " + formData.isOrganization);
        if (formData.isDonor || formData.isReceiver) {
          let rol =
            (formData.isDonor ? "Donador " : "") +
            (formData.isReceiver ? "Receptor " : "") +
            (formData.isOrganization && formData.isCharOrg ? "Benefica " : "");

          connection.query(
            "INSERT INTO GENERAL (idgeneral, rol) VALUES (?, ?)",
            [userId, rol],
            (err, result) => {
              if (err) {
                console.error(
                  "Error inserting user into corresponding table:",
                  err
                );
                res
                  .status(500)
                  .json({ error: "Error registering general user" });
              } else {
                console.log("General user successfully registered");
                if (!formData.isOrganization) {
                  connection.query(
                    "INSERT INTO GENERAL (idgeneral, rol) VALUES (?, ?)",
                    [userId, rol],
                    (err, result) => {
                      if (err) {
                        console.error(
                          "Error inserting user into corresponding table:",
                          err
                        );
                        res
                          .status(500)
                          .json({ error: "Error registering general user" });
                      } else {
                        console.log("General user successfully registered");
                      }
                    }
                  );
                }
              }
            }
          );

          // if (!formData.isOrganization) {
          //   console.log(formData.isDonor);
          //   console.log(rol + " ----");
          //   if (!formData.isVolunteer) {

          //   }
          // }
        }

        console.log("Successfully registered user: " + userId);
        res.status(200).json({ success: true });
      }
    }
  );
});
app.post("/update-password", (req, res) => {
  const { email, encPassword } = req.body;

  connection.query(
    "UPDATE usuario SET contrasenia = ? WHERE correo = ?",
    [encPassword, email],
    (err, results) => {
      if (err) {
        console.error("Error updating password:", err);
      } else {
        console.log("Password updated successfully");
      }
    }
  );
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
