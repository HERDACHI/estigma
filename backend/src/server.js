import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import doctoresRoutes from "./routes/doctores.routes.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/doctores", doctoresRoutes);
app.use("/api/productos", productosRoutes);

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});
