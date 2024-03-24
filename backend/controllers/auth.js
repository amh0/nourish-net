import { db } from "../connect.js";
import nodemailer from "nodemailer";
import { smtpConfig } from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const verifyEmail = async (req, res) => {
  const email = req.body.email;
  const existsInDB = req.body.existsInDB;

  try {
    const userQuery = "SELECT * FROM usuario WHERE correo = ?";
    const userResults = await queryDatabase(userQuery, [email]);

    if (userResults.length === existsInDB) {
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      console.log(verificationCode);
      const transporter = nodemailer.createTransport(smtpConfig);
      const mailOptions = {
        from: smtpConfig.auth.user,
        to: email,
        subject: "NOURISH NET: CÓDIGO DE VERIFICACIÓN",
        text: `Tu código de verificación es: \n ${verificationCode}`,
      };
      const sendMailResult = await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
      res.status(200).send({
        verificationCode: verificationCode,
      });
    } else {
      if (userResults.length > 0) {
        console.log("EL CORREO REGISTRADO EN LA BASE DE DATOS");
        res.status(204).send("Email already exists");
      } else {
        console.log("EL CORREO NO REGISTRADO EN LA BASE DE DATOS");
        res.status(204).send("Email does not exist");
      }
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Error verifying email");
  }
};

export const register = async (req, res) => {
  const formData = req.body;
  // console.log(JSON.stringify(formData));
  try {
    const selectQuery = "SELECT * FROM usuario WHERE correo = ?";
    const selectResults = await queryDatabase(selectQuery, [formData.email]);
    if (selectResults.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.password, salt);

    // USUARIO table
    const insertUserQuery =
      "INSERT INTO usuario(correo, contrasenia, img_perfil) VALUES (?, ?, NULL)";
    const insertUserResult = await queryDatabase(insertUserQuery, [
      formData.email,
      hashedPassword,
    ]);
    const userId = insertUserResult.insertId;

    console.log("User successfully registered in the USER table.");
    console.log("User ID: " + userId);

    // GENERAL table (son Donantes y Receptores)
    if (formData.isDonor || formData.isReceiver) {
      let rol =
        (formData.isDonor ? "Donador " : "") +
        (formData.isReceiver ? "Receptor " : "") +
        (formData.isOrganization && formData.isCharOrg ? "Benefico " : "");

      const insertGeneralQuery =
        "INSERT INTO general(idgeneral, rol) VALUES (?, ?)";
      await queryDatabase(insertGeneralQuery, [userId, rol]);
      console.log("User successfully registered in the GENERAL table.");

      if (!formData.isOrganization) {
        //PERSONA table
        const insertPersonaQuery =
          "INSERT INTO persona(idpersona, nombre, apellido_pat, apellido_mat, fechanaci, ubicacion, direccion, telefono, celular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const valueP = [
          userId,
          formData.name,
          formData.lastName,
          formData.secondLastName,
          formData.dateOfBirth,
          null,
          formData.address,
          formData.phoneNumber,
          formData.cellPhoneNumber,
        ];
        await queryDatabase(insertPersonaQuery, valueP);
        console.log("User successfully registered in the PERSONA table.");
      } else {
        //ORGANIZACION table
        const insertOrgQuery =
          "INSERT INTO organizacion(idorg, nombre, logo, tipo_entidad, ubicacion, direccion, telefono, celular, correo_contacto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const valueOrg = [
          userId,
          formData.nameOrg,
          null,
          null,
          null,
          formData.addressOrg,
          formData.phoneNumberOrg,
          formData.cellPhoneNumberOrg,
          formData.email,
        ];
        await queryDatabase(insertOrgQuery, valueOrg);
        console.log("User successfully registered in the ORGANIZACION table.");

        // RESPONSABLE table
        const insertResponsableQuery =
          "INSERT INTO responsable(nombre, apellido_pat, apellido_mat, fechanaci, direccion, telefono, celular, idorg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const valueRes = [
          formData.name,
          formData.lastName,
          formData.secondLastName,
          formData.dateOfBirth,
          formData.address,
          formData.phoneNumber,
          formData.cellPhoneNumber,
          userId,
        ];
        await queryDatabase(insertResponsableQuery, valueRes);
        console.log("User successfully registered in the RESPONSABLE table.");
      }
    }
    if (!formData.isOrganization && formData.isVolunteer) {
      // VOLUNTARIO tabla
      const insertVoluntarioQuery =
        "INSERT INTO voluntario(idvoluntario, nombre, apellido_pat, apellido_mat, fechanaci, turno, tarea, ubicacion, direccion, telefono, celular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
      const valueV = [
        userId,
        formData.name,
        formData.lastName,
        formData.secondLastName,
        formData.dateOfBirth,
        null,
        null,
        null,
        formData.address,
        formData.phoneNumber,
        formData.cellPhoneNumber,
      ];
      await queryDatabase(insertVoluntarioQuery, valueV);
      console.log("User successfully registered in the VOLUNTARIO table.");
    }
    res.status(200).json({
      message: "User successfully registered in database",
      userId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("LOOOOGIN" + password + " " + email);

  try {
    const selectQuery = "SELECT * FROM usuario WHERE correo = ?";
    const selectResults = await queryDatabase(selectQuery, [email]);
    if (selectResults.length === 0) {
      console.log("Email not found");
      return res.status(200).json({ verificationResult: "emailNotFound" });
    }
    const checkPasword = bcrypt.compareSync(
      password,
      selectResults[0].contrasenia
    );
    if (checkPasword) {
      console.log("Email and password are correct");
      res.status(200).json({ verificationResult: "correct" });
    } else {
      console.log("Incorrect password");
      res.status(200).json({ verificationResult: "incorrectPassword" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export const logout = (req, res) => {};

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
