import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProvinciasModel = sequelize.define(
  "Provincias",
  {
    descripcion_provincia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Opciones de modelo
    timestamps: true, // Puedes configurar timestamps según tu necesidad
  }
);
