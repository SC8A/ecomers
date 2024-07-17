import fs from "fs";
import shortUuid from "short-uuid";
export default { addProduct, loadProducts, loadProductsById, deleteProduct };

const path = "././data/products.json";
let temp_product = [];

async function loadProducts() {
  try {
    const data = await fs.promises.readFile(path, "utf-8");
    if (data) {
      temp_product = JSON.parse(data);
      return temp_product;
    }
    return [];
  } catch (err) {
    console.error(`Failed to read data: ${err}`);
  }
}

async function addProduct(body) {
  try {
    const products = await loadProducts();
    const { title, description, code, price, stock, category, thumbnails } =
      body;
    const newProduct = {
      id: shortUuid.generate(5),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };
    products.push(newProduct);
    await fs.promises.writeFile(path, JSON.stringify(products));
    return await newProduct;
  } catch (error) {
    console.log("Could no save the product");
  }
}
async function loadProductsById(id) {
  try {
    const products = await loadProducts();
    const product = products.find((p) => p.id === id);
    return product;
  } catch (error) {
    console.warn("Could not load the data");
  }
}
async function deleteProduct(id) {
  try {
    const data = await loadProducts();
    const products = data.filter((p) => p.id !== id);
    await fs.promises.writeFile(path, JSON.stringify(products));
    return products;
  } catch (error) {
    console.log(`${error}`);
  }
}
