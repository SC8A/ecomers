import { Router } from "express";
import products from "../utils/products.js";
import { checkProductData } from "../middleware/checkProductData.middleware.js";

const router = Router();

router.get("/products", async (req, res) => {
  const data = await products.loadProducts();
  res.send(data);
});
router.get("/products/:id", async (req, res) => {
  const data = await products.loadProductsById(Number(req.params.id));
  res.send(data);
});
router.post("/products", checkProductData, async (req, res) => {
  const body = req.body;
  const data = await products.addProduct(body);
  res.send(data);
});
router.put("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const data = await products.loadProductsById(id, body);
  res.send(data);
});
router.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.deleteProduct(id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
