import { Sequelize } from "sequelize";
import {
  DATABASE_NAME,
  DB_DIALECT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} from "./config.js";

export const sequelize = new Sequelize(DATABASE_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export const startDb = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("La conexion ah sido establecida con éxito.");
  } catch (error) {
    console.error("No se puede conectar con la base de datos:", error);
  }
};
