import fs from 'fs';
export default {addProduct, loadProducts, loadProductsById, deleteProduct};

const path='././data/products.json';
let temp_product = []


async function loadProducts(){
    try {
        const data = await fs.promises.readFile(path, 'utf-8')
        if (data){
            temp_product = JSON.parse(data)
            return temp_product
        }
        return [] 
    } catch (err) {
        console.error(`Failed to read data: ${err}`)
    }
}   

async function addProduct(body){
    try {
        const products = await loadProducts()
        const {title,description,code,price,stock,category,thumbnails} = body;
        const newProduct = {
            id: products.length +1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails 
        };
        products.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(products));
        return await newProduct
    } catch (error) {
        console.log("Could no save the product")
    }
}
async function loadProductsById(id, body = {}){
    try {
        const products = await loadProducts()
        const index = products.findIndex((p) => p.id === Number(id))
        if (body){
            products[index] = {
            ...products[index],
            ...body,
        }
        await fs.promises.writeFile(path, JSON.stringify(products))
        return products[index]
       }
       return products[index]
    
    } catch (error) {
        console.warn("Could not load the data")
    }
}
async function deleteProduct(id){
    try {
        const data = await loadProducts()
        const products = data.filter((p) => p.id !== Number(id))
        await fs.promises.writeFile(path, JSON.stringify(products))
        return products 
    } catch (error) {
        console.log(`${error}`)
    }
}