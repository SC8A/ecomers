import { Router } from "express";
import carts from "../utils/carts.js";

const router = Router();

router.get("/carts", async (req, res) => {
  const data = await carts.loadCarts();
  res.send(data);
});
router.get("/carts/:cart_id", async (req, res) => {
  const id = req.params.cart_id;
  const data = await carts.loadCartById(id);
  res.send(data);
});

router.post("/:cart_id/carts/:product_id", async (req, res) => {
  const { cart_id, product_id } = req.params;
  const data = await carts.addProductToCart(cart_id, product_id);
  res.send(data);
});
router.post("/carts", async (req, res) => {
  const data = await carts.createCart();
  res.send(data);
});

export default router;
