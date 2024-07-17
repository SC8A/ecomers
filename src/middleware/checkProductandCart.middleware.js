import { request, response } from "express";
import productDao from "../dao/product.dao.js";
import cartDao from "../dao/cart.dao.js";

export async function checkProductsAndCarts(
  req = request,
  res = response,
  next,
) {
  try {
    const { cart_id, product_id } = req.params;
    const product = await productDao.getById(product_id);
    if (!product) {
      return res.status(404).send({ status: "error", msg: "No product found" });
    }
    const cart = await cartDao.getById(cart_id);
    if (!cart) {
      return res.status(404).send({ status: "error", msg: "No cart found" });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "error", msg: "Error interno del servidor" });
  }
}
