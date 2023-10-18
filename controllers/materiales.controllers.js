import { MaterialesModel } from "../models/Materiales.js";

export const ctrlView = async (req, res) => {
  try {
    const materiales = await MaterialesModel.findAll();
    res.render("ingresos.ejs", { materiales });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Server",
    });
  }
};

//controllador para traer todo el inventario
export const ctrlGetMateriales = async (req, res) => {
  try {
    const materiales = await MaterialesModel.findAll();
    if (!materiales) return res.status(404);
    return res.status(200).json(materiales);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para crear todo el material
export const ctrlCreateMateriales = async (req, res) => {
  try {
    const newIngreso = await MaterialesModel.create(req.body);
    return res.status(201).json(newIngreso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para actualizar todo el inventario
export const ctrlUpdateMateriales = async (req, res) => {
  const { id } = req.params;
  try {
    const materiales = await MaterialesModel.findByPk(id);

    if (!materiales) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    materiales.update(req.body);

    return res.status(200).json(materiales);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Servidor",
    });
  }
};

//controllador para eliminar todo el inventario
export const ctrlDeleteMateriales = async (req, res) => {
  const { id } = req.params;
  try {
    const inventarioDeleted = await MaterialesModel.destroy({
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
