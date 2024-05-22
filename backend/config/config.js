import { config } from "dotenv";
config();

export const database = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  multipleStatements: true,
};

export const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "contact.nourishnet@gmail.com",
    // Contrasenia de aplicacion
    pass: "yfnollxnxikdqcpy",
  },
};
