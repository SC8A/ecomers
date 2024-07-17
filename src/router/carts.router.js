import { Router } from "express";
import cartDao from "../dao/cart.dao.js";
import { checkProductsAndCarts } from "../middleware/checkProductandCart.middleware.js";
const router = Router();

router.get("/carts", async (req, res) => {
  const data = await cartDao.getAll();
  res.send(data);
});
router.get("/carts/:cart_id", async (req, res) => {
  const id = req.params.cart_id;
  const data = await cartDao.getById(id);
  res.send(data);
});

router.post(
  "/:cart_id/carts/:product_id",
  checkProductsAndCarts,
  async (req, res) => {
    const { cart_id, product_id } = req.params;
    const data = await cartDao.addProductToCart(cart_id, product_id);
    res.send(data);
  },
);
router.post("/carts", async (req, res) => {
  const data = await cartDao.createCart();
  res.send(data);
});

export default router;
