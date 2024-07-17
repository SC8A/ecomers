import { Router } from "express";
import { checkProductData } from "../middleware/checkProductData.middleware.js";
import productDao from "../dao/product.dao.js";
const router = Router();

router.get("/products", async (req, res) => {
  const data = await productDao.getAll();
  res.send(data);
});
router.get("/products/:id", async (req, res) => {
  const data = await productDao.getById(req.params.id);
  res.send(data);
});
router.post("/products", checkProductData, async (req, res) => {
  const body = req.body;
  const data = await productDao.createProduct(body);
  res.send(data);
});
router.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = await productDao.update(id, body);
  res.status(200).send(data);
});
router.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productDao.deleteOne(id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
