import mongoose from "mongoose";

const productCollection = "product";

// Model of the schema
const cartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: Array,
    default: [],
  },
});

// Exporting the model we'll use
export const productModel = mongoose.model(productCollection, cartSchema);
