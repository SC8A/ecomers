import express from "express";
import { loadProducts,addProduct, loadProductsById } from "./routes/products.js";


const app = express();
const port = 8080;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is working");
});

app
  .get("/api/products",async (req, res) => {
    res.send(await loadProducts());
  })
  .get("/api/products/:id",async (req, res) => {
    const data = await loadProductsById(Number(req.params.id))
    res.send(data)
  })
  .post("/api/products",async (req, res) => {
    const body = req.body;
    const data = await addProduct(body)
    res.send(data)
  })
  .put("/api/products",(req, res) => {
    res.send("Update the product");
  });

app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
