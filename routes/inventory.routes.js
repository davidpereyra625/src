import { Router } from "express";
import {
  ctrlCreateInventory,
  ctrlDeleteInventory,
  ctrlGetInventory,
  ctrlUpdateInventory,
  ctrlViewIndex,
  ctrlView,
  // ctrlGetStock,
} from "../controllers/inventory.controllers.js";
import {
  ctrlCreateMateriales,
  ctrlDeleteMateriales,
  ctrlGetMateriales,
  ctrlUpdateMateriales,
} from "../controllers/materiales.controllers.js";
import {
  ctrlViewSalidas,
  ctrlCreateSalidas,
  ctrlDeleteSalidas,
  ctrlGetSalidas,
  ctrlUpdateSalidas,
  getCantidadDisponible,
} from "../controllers/salidas.controllers.js";
import {
  createMaterialesSchema,
  editMaterialesSchema,
} from "../models/schemas/materiales.schema.js";
import { validator } from "../middlewares/validator.js";

const inventoryRouter = Router();

//Rutas para las vistas
// Ruta para la página de inicio (index)
// RUTA PARA LA PÁGINA DE INICIO
inventoryRouter.get("/", ctrlViewIndex);
inventoryRouter.get("/inventario", ctrlView);
inventoryRouter.get("/salidas", ctrlViewSalidas);

//para traer todo el inventario
inventoryRouter.get("/api/inventario", ctrlGetInventory);
inventoryRouter.get("/api/materiales", ctrlGetMateriales);
inventoryRouter.get("/api/salidas", ctrlGetSalidas);

//para crear todo el inventario
inventoryRouter.post("/api/inventario", ctrlCreateInventory);
inventoryRouter.post("/api/materiales", ctrlCreateMateriales);
inventoryRouter.post("/api/salidas", ctrlCreateSalidas);

//para modificar todo el inventario
inventoryRouter.put("/api/inventario/:id", ctrlUpdateInventory);
inventoryRouter.put("/api/materiales/:id", ctrlUpdateMateriales);
inventoryRouter.put("/api/salidas/:id", ctrlUpdateSalidas);

//para eliminar todo el inventario
inventoryRouter.delete("/api/inventario/:id", ctrlDeleteInventory);
inventoryRouter.delete("/api/materiales/:id", ctrlDeleteMateriales);
inventoryRouter.delete("/api/salidas/:id", ctrlDeleteSalidas);

// Define una ruta para obtener la cantidad disponible
inventoryRouter.get("/api/cantidadDisponible/:materialId", async (req, res) => {
  const materialId = req.params.materialId;
  const cantidadDisponible = await getCantidadDisponible(materialId);
  res.json({ cantidadDisponible });
});

export { inventoryRouter };
