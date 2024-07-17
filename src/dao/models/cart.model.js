import mongoose from "mongoose";

const cartCollection = "carts";

// Model of the schema
const cartSchema = new mongoose.Schema({
  products: {
    // Mongoose sintaxys
    type: Array,
    default: [],
  },
});

// Exporting the model we'll use
export const cartModel = mongoose.model(cartCollection, cartSchema);
