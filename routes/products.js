import fs from 'fs';
import { type } from 'os';
export {addProduct, loadProducts, loadProductsById};


const path='./data/products.json';
const products_array = []

async function loadProducts(){
    try {
        const data = await fs.promises.readFile(path, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        console.error(`Failed to read data: ${err}`)
    }
}   
async function addProduct(body){
    try {
        const {title,description,code,price,stock,category,thumbnails} = body;
        const newProduct = {
            id: products_array.length +1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails 
        };
        products_array.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(products_array));
        return await newProduct
    } catch (error) {
        console.log("Could no save the product")
    }
}
async function loadProductsById(id){
    try {
        const data = await loadProducts()
        for (const product of data){
            if (product.id === Number(id))
                return product
        }
        return {message: "The product does not exist"}
    } catch (error) {
        console.warn("Could load the data")
    }
}
