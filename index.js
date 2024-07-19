import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import authRouter from "./src/routes/auth.routes.js";
import likeRouter from "./src/routes/like.routes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json())

//Error Handler
app.use(errorHandler)


app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/auth', authRouter)
app.use('/api/like', likeRouter)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("server running", PORT);
});
