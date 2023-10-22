import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { MaterialesModel } from "./Materiales.js"; // Importa el modelo de materiales

export const InventarioTransaccionesModel = sequelize.define(
  "InventarioTransacciones",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_materiales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipo_transaccion: {
      type: DataTypes.ENUM("entrada", "salida"),
      allowNull: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_transaccion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }
);

// Configura la relación de clave externa con la tabla Materiales
InventarioTransaccionesModel.belongsTo(MaterialesModel, {
  foreignKey: "id_materiales", // Nombre de la clave externa en el modelo InventarioTransacciones
  as: "materiales", // Nombre de la asociación
});
