import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db_inventory", "root", "", {
  host: "localhost",
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
