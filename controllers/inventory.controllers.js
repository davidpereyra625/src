import { IngresosModel } from "../models/Ingresos.js";
import { MaterialesModel } from "../models/Materiales.js";

// controlador para mostrar la vista
export const ctrlView = async (req, res) => {
  try {
    const ingresos = await IngresosModel.findAll();
    const materiales = await MaterialesModel.findAll();
    res.render("ingresos.ejs", { ingresos, materiales });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Server",
    });
  }
};

//controllador para traer todo el inventario
export const ctrlGetInventory = async (req, res) => {
  try {
    const ingresos = await IngresosModel.findAll();
    if (!ingresos) return res.status(404);
    return res.status(200).json(ingresos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para crear todo el inventario
export const ctrlCreateInventory = async (req, res) => {
  try {
    const newIngreso = await IngresosModel.create(req.body);
    return res.status(201).json(newIngreso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para actualizar todo el inventario
export const ctrlUpdateInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await IngresosModel.findByPk(id);

    if (!inventory) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    inventory.update(req.body);

    return res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para eliminar todo el inventario
export const ctrlDeleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventarioDeleted = await IngresosModel.destroy({
      where: {
        id: id,
      },
    });
    if (!inventarioDeleted) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }
    return res.status(200).json({
      message: "Tarea eliminada",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};
