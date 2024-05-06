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

      let tipo = formData.isOrganization ? "organización" : "persona";
      const insertGeneralQuery =
        "INSERT INTO general(idgeneral, rol, tipo) VALUES (?, ?, ?)";
      await queryDatabase(insertGeneralQuery, [userId, rol, tipo]);
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
    // carrito
    const cartQuery = "insert into donacion (idgeneral, estado) values (?, ?)";
    const cartValues = [userId, "Inactivo"];
    await queryDatabase(cartQuery, cartValues);
    console.log("Carrito creado....");
    // -------

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
    if (!checkPasword) {
      console.log("Incorrect password");
      return res.status(200).json({ verificationResult: "incorrectPassword" });
    }
    console.log("Email and password are correct");
    // res.status(200).json({ verificationResult: "correct" });

    let userData = selectResults[0];
    const { contrasenia, ...others } = userData;
    userData = others;

    let isAdmin = false;
    let isVolunteer = false;
    let isOrganization = false;
    let isDonor = false;
    let isReceiver = false;
    let isBeneficial = false;

    let idCarrito = -1;
    let itemQty = 0;
    let newNotifQty = 0;
    //ADMIN
    const adminQuery = "SELECT * FROM ADMIN WHERE idadmin = ?";
    const adminResults = await queryDatabase(adminQuery, [
      selectResults[0].idusuario,
    ]);

    if (adminResults.length > 0) {
      isAdmin = true;
      const adminData = { ...adminResults[0] };
      delete adminData.idadmin;
      userData = { ...userData, ...adminData };
    } else {
      //TABLA VOLUNTARIO
      const volunteerQuery = "SELECT * FROM VOLUNTARIO WHERE idvoluntario = ?";
      const volunteerResults = await queryDatabase(volunteerQuery, [
        selectResults[0].idusuario,
      ]);
      if (volunteerResults.length > 0) {
        isVolunteer = true;
        const volunteerData = { ...volunteerResults[0] };
        delete volunteerData.idvoluntario;
        userData = { ...userData, ...volunteerData };
      }
      // TABLE GENERAL
      const roleQuery = "SELECT * FROM GENERAL WHERE idgeneral = ?";
      const roleResults = await queryDatabase(roleQuery, [
        selectResults[0].idusuario,
      ]);
      // --- obtener id carrito
      const cartQuery = `select g.idgeneral as idgeneral, iddonacion as idCarrito
         from general g inner join donacion d 
         on g.idgeneral = d.idgeneral 
         where g.idgeneral = ? and estado = ?`;
      const cartData = [selectResults[0].idusuario, "Inactivo"];
      const cartResult = await queryDatabase(cartQuery, cartData);
      // obtener cantidad de productos
      if (cartResult.length > 0) {
        idCarrito = cartResult[0].idCarrito;
        const qtyQuery = `select count(idalimento) cantidadProd
        from tiene_a 
        where iddonacion = ?`;
        const qtyResult = await queryDatabase(qtyQuery, [idCarrito]);
        itemQty = qtyResult[0].cantidadProd;
      }
      // ---
      if (roleResults.length > 0) {
        const userRole = roleResults[0].rol.split(" ");
        if (userRole.includes("Receptor")) isReceiver = true;
        if (userRole.includes("Donador")) isDonor = true;
        if (userRole.includes("Benefico")) isBeneficial = true;

        if (!isVolunteer) {
          //TABLE ORGANIZACION
          const organizationQuery =
            "SELECT * FROM ORGANIZACION WHERE idorg = ?";
          const organizationResults = await queryDatabase(organizationQuery, [
            selectResults[0].idusuario,
          ]);
          if (organizationResults.length > 0) {
            const organizationData = { ...organizationResults[0] };
            delete organizationData.idorg;
            userData = { ...userData, ...organizationData };
            isOrganization = true;
          }

          //TABLE PERSONA
          const personaQuery = "SELECT * FROM PERSONA WHERE idpersona  = ?";
          const personaResults = await queryDatabase(personaQuery, [
            selectResults[0].idusuario,
          ]);
          if (personaResults.length > 0) {
            const personaData = { ...personaResults[0] };
            delete personaData.idpersona;
            userData = { ...userData, ...personaData };
          }
        }
      }
    }

    userData = {
      ...userData,
      isAdmin: isAdmin,
      isVolunteer: isVolunteer,
      isDonor: isDonor,
      isOrganization: isOrganization,
      isReceiver: isReceiver,
      isBeneficial: isBeneficial,
      idCarrito: idCarrito,
      itemQty: itemQty,
    };

    // console.log(JSON.stringify(userData));

    const token = jwt.sign(
      { idusuario: selectResults[0].idusuario },
      "secretkey"
    );

    // const { contrasenia, ...others } = selectResults[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userData);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // console.log(password + " " + hashedPassword);
    const selectQuery = "UPDATE usuario SET contrasenia = ? WHERE correo = ?";
    const selectResults = await queryDatabase(selectQuery, [
      hashedPassword,
      email,
    ]);
    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Error resetting password" });
  }
};

export const logout = (req, res) => {
  console.log("User has been logged out");
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
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

// CAMBIAR CONTRASENIA
export const verifyPassword = async (req, res) => {
  const userId = req.body.userId;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  // console.log(req.body);
  try {
    const userQuery = "SELECT contrasenia FROM usuario WHERE idusuario = ?";
    const userResults = await queryDatabase(userQuery, [userId]);

    if (userResults.length === 1) {
      const hashedPasswordFromDB = userResults[0].contrasenia;
      // console.log(userResults);

      const isPasswordMatch = bcrypt.compareSync(
        currentPassword,
        hashedPasswordFromDB
      );

      if (isPasswordMatch) {
        // La contraseña es correcta so cambiarla
        if (currentPassword === newPassword) {
          res.status(200).send({
            message: "La nueva contraseña debe ser distinta a la antigua",
          });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(newPassword, salt);
          const updateQuery =
            "UPDATE usuario SET contrasenia = ? WHERE idusuario = ?";
          await queryDatabase(updateQuery, [hashedPassword, userId]);

          // si es admin
          const updateQ =
            "UPDATE admin SET actualizar_pass = FALSE WHERE idadmin = ?";
          await queryDatabase(updateQ, [userId]);
          res.status(200).send({ success: true });
        }
      } else {
        // La contraseña es incorrecta
        res
          .status(200)
          .send({ success: false, message: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).send({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).send("Error verifying password");
  }
};

export const addAdmin = async (req, res) => {
  let imagen = null;
  if (req.file) {
    imagen = req.file.filename;
  }
  const { correo, contrasena, nombre, apellido_paterno, apellido_materno } =
    req.body;
  console.log(req.body);

  if (correo === "" || contrasena == "") {
    res.status(200).send({
      message: "Es necesario llenar los espacios de correo y contraseña.",
    });
  } else {
    const userQuery = "SELECT * FROM usuario WHERE correo = ?";
    const userResults = await queryDatabase(userQuery, [correo]);
    // console.log(userResults);
    if (userResults.length === 1) {
      res.status(200).send({
        message: "El correo ya existe utilice otro.",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(contrasena, salt);

      // USUARIO table
      const insertUserQuery =
        "INSERT INTO usuario(correo, contrasenia, img_perfil) VALUES (?, ?, ?)";
      const insertUserResult = await queryDatabase(insertUserQuery, [
        correo,
        hashedPassword,
        imagen,
      ]);
      const userId = insertUserResult.insertId;

      //TABLA ADMIN
      const insertAdminQuery =
        "INSERT INTO admin(idadmin, nombre, apellido_pat, apellido_mat) VALUES (?,?, ?, ?)";
      const insertAdminResult = await queryDatabase(insertAdminQuery, [
        userId,
        nombre,
        apellido_paterno,
        apellido_materno,
      ]);

      //enviar correo:
      const transporter = nodemailer.createTransport(smtpConfig);
      const mailOptions = {
        from: smtpConfig.auth.user,
        to: correo,
        subject: "NOURISH NET: NUEVO ADMINISTRADOR",
        text: `Su correo: ${correo} fue registrado como parte de los Admiistradores de nuestra página. \nLa contraseña con la que puede ingresar a su cuenta es: \n${contrasena}\n Al ingresar a su cuenta debe cambiar su contraseña.`,
      };
      const sendMailResult = await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
      res.status(200).send({
        message: "ok",
      });
    }
  }
};
