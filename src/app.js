import express from "express";
import productRouter from "./router/product.router.js"
import cartRouter  from "./router/carts.router.js"

const app = express();
const port = 8080;

app.use(express.json()) //this is middleware that allows us to get json files
app.use(express.urlencoded({ extended: true })); //allows to the server read files with accents
app.use("/",express.static("public"))
app.use("/api", productRouter)
app.use("/api",cartRouter)

app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
