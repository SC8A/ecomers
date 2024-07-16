// this is gonna have all the functions to the CRUD 
import { cartModel } from "./models/cart.model.js" 
const getById = async (id) => {
    const cart = await cartModel.findById(id)
    return cart
}
const createCart = async (data) => {
    const cart = await cartModel.create(data)
    return cart
}

export default { getById, createCart }