import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { MaterialesModel } from "./Materiales.js"; // Importa el modelo de materiales

export const IngresosModel = sequelize.define(
  "Ingresos",
  {
    id_materiales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    movil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cantidad_ingreso: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // Opciones de modelo
    timestamps: true, // Si necesitas marcar la fecha y hora de creación de entradas
  }
);
// Configura la relación de clave externa con la tabla Materiales
IngresosModel.belongsTo(MaterialesModel, {
  foreignKey: "id_materiales", // Nombre de la clave externa en el modelo EntradaModel
  as: "materiales", // Nombre de la asociación
});
