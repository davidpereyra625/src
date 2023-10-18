import { Router } from "express";
import {
  ctrlCreateInventory,
  ctrlDeleteInventory,
  ctrlGetInventory,
  ctrlUpdateInventory,
  ctrlView,
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
} from "../controllers/salidas.controllers.js";
import {
  createMaterialesSchema,
  editMaterialesSchema,
} from "../models/schemas/materiales.schema.js";
import { validator } from "../middlewares/validator.js";

const inventoryRouter = Router();

//Rutas para las vistas

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

export { inventoryRouter };
