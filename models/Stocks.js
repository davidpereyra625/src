import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { MaterialesModel } from "./Materiales.js"; // Importa el modelo de materiales

export const StocksModel = sequelize.define(
  "Stocks",
  {
    id_materiales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cantidad_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // Opciones de modelo
    timestamps: true, // Si necesitas marcar la fecha y hora de creación de materiales
  }
);
// Configura la relación de clave externa con la tabla Materiales
StocksModel.belongsTo(MaterialesModel, {
  foreignKey: "id_materiales", // Nombre de la clave externa en el modelo EntradaModel
  as: "materiales", // Nombre de la asociación
});
