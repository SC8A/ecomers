import { Router } from "express";
import data from "../utils/products.js";
import { io } from "../app.js";
import { checkProductData } from "../middleware/checkProductData.middleware.js";
const router = Router();

router.get("/", async (req, res) => {
  const products = await data.loadProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await data.loadProducts();
  io.on("connection", (socket) => {
    console.log("New client connected in real time products");
    socket.emit("products", products);
  });

  res.render("realTimeProducts");
});

router.post("/realtimeproducts",checkProductData, async (req, res) => {
  await data.addProduct(req.body);
  const updated_products = await data.loadProducts();
  io.emit("products", updated_products);
  res.render("realTimeProducts");
});

router.delete("/realtimeproducts" ,async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  console.log(id);
  await data.deleteProduct(id);
  const updated_products = await data.loadProducts();
  io.emit("products", updated_products);
  res.render("realTimeProducts");
});

export default router;
