import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { MaterialesModel } from "./Materiales.js"; // Importa el modelo de materiales
import { ProvinciasModel } from "./Provincias.js"; // Importa el modelo de materiales

export const SalidasModel = sequelize.define(
  "Salidas",
  {
    id_materiales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_provincias: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    movil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cantidad_salida: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // Opciones de modelo
    timestamps: true, // Si necesitas marcar la fecha y hora de creación de salidas
  }
);

// Configura la relación de clave externa con la tabla Materiales
SalidasModel.belongsTo(MaterialesModel, {
  foreignKey: "id_materiales", // Nombre de la clave externa en el modelo EntradaModel
  as: "materiales", // Nombre de la asociación
});

// Configura la relación de clave externa con la tabla Materiales
SalidasModel.belongsTo(ProvinciasModel, {
  foreignKey: "id_provincias", // Nombre de la clave externa en el modelo EntradaModel
  as: "provincias", // Nombre de la asociación
});
