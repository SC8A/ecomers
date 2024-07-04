import fs from 'fs';
import products_functions from './products.js';
export default {createCart, loadCarts, addProductToCart, loadCartById}

let temp_carts = [];
const path = "././data/carts.json";

async function loadCarts(){
    const cartsJson = await fs.promises.readFile(path, "utf-8");
    if (cartsJson){
        temp_carts = JSON.parse(cartsJson);
        return temp_carts
    }
    return [];
    
}

async function createCart(){
    try {
       const carts = await loadCarts()
       const newCart = {
        id: carts.length +1,
        products: [],  
       };
       carts.push(newCart);
       await fs.promises.writeFile(path, JSON.stringify(carts))
       return newCart;
    } catch (error) {
        console.log(`Error from creating cart \n${error}`)
    }
} 
          
async function addProductToCart(cart_id, product_id){
    try {
        const carts = await loadCarts()
        const cart = carts.find((i) => i.id === Number(cart_id))
        const cart_index = carts.findIndex((i) => i.id === Number(cart_id))
        const product = await products_functions.loadProductsById(Number(product_id));
        //If the product already exist in the array of products
        const verification = carts[cart_index].products.find((p) => p.product === Number(product_id))
        const verification_idex = carts[cart_index].products.findIndex((p) => p.product === Number(product_id))
        if (verification){ 
            carts[cart_index].products[verification_idex].quantity += 1
            await fs.promises.writeFile(path, JSON.stringify(carts))
            return carts[cart_index].products[verification_idex]
        }
        //if the product does not exist in the cart
        if (cart && product){
            const new_product = {
                product: Number(product_id),
                quantity: 1,
            }
            carts[cart_index].products.push(new_product)
            await fs.promises.writeFile(path, JSON.stringify(carts))
            return new_product
        }
        //If either the cart nor the product exist 
        return {"message": "product no available"} 
    } catch (error) {
        console.log(`Error from adding product to cart ${error}`)
    }
}

async function loadCartById(id){
    try {
        const carts = await loadCarts();
        const cart = carts.find(c => c.id === Number(id));
        if (cart){
            return cart
        }
        return {"message": "Cart no available"}
    } catch (error) {
        console.log(`${error}`)
    }
}