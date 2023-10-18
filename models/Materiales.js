import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const MaterialesModel = sequelize.define(
  "Materiales",
  {
    codigo_materiales: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_materiales: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Opciones de modelo
    timestamps: true, // Si necesitas marcar la fecha y hora de creación de materiales
  }
);
