import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json())


app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("server running", PORT);
});
