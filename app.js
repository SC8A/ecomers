import express from "express";
import productRouter from "./routes/product.router.js"
import cartRouter  from "./routes/carts.router.js"


const app = express();
const port = 8080;

app.use(express.json())
app.use("/api", productRouter)
app.use("/api",cartRouter)

app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
