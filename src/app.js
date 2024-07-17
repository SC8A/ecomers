import express from "express";
import productRouter from "./router/product.router.js";
import cartRouter from "./router/carts.router.js";
import viewRoutes from "./router/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import { mongoDbconnection } from "./utils/db_connection.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

mongoDbconnection();
app.engine("handlebars", handlebars.engine()); //Ininit templantes motor
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json()); //this is middleware that allows us to get json files
app.use(express.urlencoded({ extended: true })); //allows to the server read files with accents
app.use("/", express.static("public"));
app.use("/", viewRoutes);
app.use("/api", productRouter);
app.use("/api", cartRouter);

const httpServer = app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});

//Web socket configuration
export const io = new Server(httpServer);
