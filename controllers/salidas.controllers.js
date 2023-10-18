import { SalidasModel } from "../models/Salidas.js";
import { IngresosModel } from "../models/Ingresos.js";
import { MaterialesModel } from "../models/Materiales.js";
import { ProvinciasModel } from "../models/Provincias.js";

// controlador para mostrar la vista
export const ctrlViewSalidas = async (req, res) => {
  try {
    const ingresos = await IngresosModel.findAll();
    const materiales = await MaterialesModel.findAll();
    const salidas = await SalidasModel.findAll();
    const provincias = await ProvinciasModel.findAll();
    res.render("salidas.ejs", { salidas, ingresos, materiales, provincias });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Server",
    });
  }
};

//controllador para traer todo el inventario
export const ctrlGetSalidas = async (req, res) => {
  try {
    const salidas = await SalidasModel.findAll();
    if (!salidas) return res.status(404);
    return res.status(200).json(salidas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para crear todo el inventario
export const ctrlCreateSalidas = async (req, res) => {
  try {
    const newSalidas = await SalidasModel.create(req.body);
    return res.status(201).json(newSalidas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para actualizar todo el inventario
export const ctrlUpdateSalidas = async (req, res) => {
  const { id } = req.params;
  try {
    const salidas = await SalidasModel.findByPk(id);

    if (!salidas) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    salidas.update(req.body);

    return res.status(200).json(salidas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para eliminar todo el inventario
export const ctrlDeleteSalidas = async (req, res) => {
  const { id } = req.params;
  try {
    const salidasDeleted = await SalidasModel.destroy({
      where: {
        id: id,
      },
    });
    if (!salidasDeleted) {
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
