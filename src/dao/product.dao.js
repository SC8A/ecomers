import { productModel } from "./models/product.model.js"

const getAll = async () => {
    const product = await productModel.find()
    return product
}

const getById = async (id) => {
    const product = await productModel.findById(id)
    return product
}
const createProduct = async (data) => {
    const product = await productModel.create(data)
    return product 
}

const update = async(id, data) =>{
    const product = await productModel.findByIdAndUpdate(id, data, {new: true})
    return product
}

const deleteOne = async(id) => {
    const product = await productModel.findByIdAndDelete(id)
    return product
}

export default { getById, createProduct, getAll, update, deleteOne }