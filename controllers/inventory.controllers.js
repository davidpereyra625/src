import { IngresosModel } from "../models/Ingresos.js";
import { SalidasModel } from "../models/Salidas.js";
import { MaterialesModel } from "../models/Materiales.js";
import { StocksModel } from "../models/Stocks.js";
import { InventarioTransaccionesModel } from "../models/InventarioTransacciones.js";

// Controlador para mostrar la página de inicio
export const ctrlViewIndex = async (req, res) => {
  try {
    // Mover la lógica de cálculo de stock aquí
    const materiales = await MaterialesModel.findAll();

    // Calcular el stock actual para cada material
    const stock = await Promise.all(
      materiales.map(async (material) => {
        const ingresos = await IngresosModel.sum("cantidad_ingreso", {
          where: { id_materiales: material.id },
        });

        const salidas = await SalidasModel.sum("cantidad_salida", {
          where: { id_materiales: material.id },
        });
        const stockActual = ingresos - salidas;
        return {
          material: material.nombre_materiales,
          stock: stockActual,
        };
      })
    );

    // Renderizar la vista index.ejs con los datos de stock
    res.render("index.ejs", { stock });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

// controlador para mostrar la vista
export const ctrlView = async (req, res) => {
  try {
    const ingresos = await IngresosModel.findAll();
    const materiales = await MaterialesModel.findAll();

    // Definir materialSeleccionado aquí antes de renderizar la vista
    const materialSeleccionado =
      "Aquí coloca el valor del material seleccionado"; // Puedes obtener este valor de tu lógica de negocio

    res.render("ingresos.ejs", { ingresos, materiales, materialSeleccionado });
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

// Controlador para crear un nuevo ingreso
export const ctrlCreateInventory = async (req, res) => {
  try {
    const newIngreso = await IngresosModel.create(req.body);

    // Registra la transacción en InventarioTransacciones
    await InventarioTransaccionesModel.create({
      id_materiales: req.body.id_materiales,
      tipo_transaccion: "entrada",
      cantidad: req.body.cantidad_ingreso,
      fecha_transaccion: new Date(),
    });

    const materialId = req.body.id_materiales;
    const cantidadIngreso = req.body.cantidad_ingreso;

    // Actualiza la cantidad en el stock o crea un nuevo registro si no existe
    await updateStock(materialId, cantidadIngreso);

    return res.status(201).json(newIngreso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

// Función para actualizar el stock en la tabla StockModel
async function updateStock(materialId, cantidad) {
  const stockRecord = await StocksModel.findOne({
    where: { id_materiales: materialId },
  });

  if (stockRecord) {
    stockRecord.cantidad_stock += cantidad;
    await stockRecord.save();
  } else {
    // Si no existe un registro de stock para este material, créalo
    await StocksModel.create({
      id_materiales: materialId,
      cantidad_stock: cantidad,
    });
  }
}

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
