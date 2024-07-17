// this is gonna have all the functions to the CRUD
import { json } from "express";
import { cartModel } from "./models/cart.model.js";

const getAll = async () => {
  return await cartModel.find();
};

const getById = async (id) => {
  try {
    return await cartModel.findById(id);
  } catch (error) {
    console.warn("the cart does not exist");
  }
};
const createCart = async (data) => {
  try {
    return await cartModel.create(data);
  } catch (error) {
    console.warn("Could not create the cart");
  }
};

const addProductToCart = async (cid, pid) => {
  try {
    let cart = await cartModel.findById(cid);
    const productInCartIndex = cart.products.findIndex(
      (prod) => prod.product == pid,
    );

    if (productInCartIndex !== -1) {
      cart.products[productInCartIndex].quantity += 1;
      // This notify mongoose the dataset has changed
      cart.markModified("products");
      await cart.save();
      return cart;
    }
    console.log("entre aca tambien");
    cart.products.push({ product: pid, quantity: 1 });
    await cart.save(); // Saving in the DB
    return cart;
  } catch (error) {
    console.warn("Something went wrong");
  }
};

export default { getById, createCart, addProductToCart, getAll };
