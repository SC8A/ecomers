import { json } from "express";
import { productModel } from "./models/product.model.js";

const getAll = async () => {
  try {
    return await productModel.find();
  } catch (error) {
    console.warn("Could not load the products");
  }
};

const getById = async (id) => {
  try {
    return await productModel.findById(id);
  } catch (error) {
    console.warn("Could not load the product");
  }
};

const createProduct = async (data) => {
  try {
    const product = await productModel.create(data);
    return product;
  } catch (error) {
    console.warn("Could not create the product");
  }
};

const update = async (id, data) => {
  try {
    return await productModel.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.warn("Could not update the product");
  }
};

const deleteOne = async (id) => {
  try {
    return await productModel.findByIdAndDelete(id);
  } catch (error) {
    console.warn("Could not delete the product");
  }
};

export default { getById, createProduct, getAll, update, deleteOne };
