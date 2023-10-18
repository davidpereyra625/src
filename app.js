import express from "express";
import { inventoryRouter } from "./routes/inventory.routes.js";
import { startDb } from "./config/database.js";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { log } from "node:console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
app.use(express.json()); //ACORDARSE SIEMPRE DE PONER
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const port = 3000;

// app.get("/", (req, res) => {
//   res.send("todo listo");
// });

app.use("/", inventoryRouter);

app.listen(port, () => {
  console.log(`servidor listo -> http://localhost:${port}/inventario`);
  startDb();
});
