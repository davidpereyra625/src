import { SalidasModel } from "../models/Salidas.js";
import { IngresosModel } from "../models/Ingresos.js";
import { MaterialesModel } from "../models/Materiales.js";
import { ProvinciasModel } from "../models/Provincias.js";
import { StocksModel } from "../models/Stocks.js";
import { InventarioTransaccionesModel } from "../models/InventarioTransacciones.js";

export async function getCantidadDisponible(materialId) {
  try {
    const stockRecord = await StocksModel.findOne({
      where: { id_materiales: materialId },
    });

    if (stockRecord) {
      return stockRecord.cantidad_stock;
    } else {
      return 0; // Si no hay un registro de stock para este material, se asume que la cantidad disponible es 0.
    }
  } catch (error) {
    console.error(error);
    return 0; // En caso de error, se asume que la cantidad disponible es 0.
  }
}
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

// Controlador para crear las salidas y actualizar el stock
export const ctrlCreateSalidas = async (req, res) => {
  try {
    const newSalida = await SalidasModel.create(req.body);

    // Registra la transacción en InventarioTransacciones
    await InventarioTransaccionesModel.create({
      id_materiales: req.body.id_materiales,
      tipo_transaccion: "salida",
      cantidad: req.body.cantidad_salida,
      fecha_transaccion: new Date(),
    });

    // Resta la cantidad de salida al stock
    await updateStock(req.body.id_materiales, req.body.cantidad_salida); // Pasa la cantidad de salida como positiva

    return res.status(201).json(newSalida);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};
async function updateStock(materialId, cantidad) {
  const transacciones = await InventarioTransaccionesModel.findAll({
    where: {
      id_materiales: materialId,
      tipo_transaccion: "salida",
    },
  });

  const sumaSalidas = transacciones.reduce((total, transaccion) => {
    return total + transaccion.cantidad;
  }, 0);

  const stockRecord = await StocksModel.findOne({
    where: { id_materiales: materialId },
  });

  if (stockRecord) {
    stockRecord.cantidad_stock -= cantidad; // Resta la cantidad de salida del stock
    await stockRecord.save();
  } else {
    // Si no existe un registro de stock para este material, créalo
    const nuevaCantidadStock = 0 - cantidad; // Inicializa con 0

    await StocksModel.create({
      id_materiales: materialId,
      cantidad_stock: nuevaCantidadStock,
    });
  }
}

//controllador para actualizar todo el inventario
export const ctrlUpdateSalidas = async (req, res) => {
  const { id } = req.params;
  try {
    const salida = await SalidasModel.findByPk(id);

    if (!salida) {
      return res.status(404).json({
        message: "Salida no encontrada",
      });
    }

    const materialId = salida.id_materiales;
    const cantidadAnterior = salida.cantidad_salida;
    const cantidadNueva = req.body.cantidad_salida;

    // Actualiza la transacción en InventarioTransacciones
    await InventarioTransaccionesModel.update(
      {
        cantidad: cantidadNueva,
        fecha_transaccion: new Date(),
      },
      {
        where: {
          id_materiales: materialId,
          tipo_transaccion: "salida",
          cantidad: cantidadAnterior,
        },
      }
    );

    // Actualiza el stock en función de las transacciones
    await updateStock(materialId, cantidadNueva - cantidadAnterior);

    salida.update(req.body);

    return res.status(200).json(salida);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
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
