import mysql from "mysql2";
import { database } from "./config/config.js";

export const db = mysql.createConnection(database);
