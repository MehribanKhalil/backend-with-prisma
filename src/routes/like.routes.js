import express from "express";
import { likeProduct } from "../controller/like.controller.js";
import { verifyToken } from "../middleware/verify.token.js";

const router = express.Router();

router.post("/create",verifyToken, likeProduct);

export default router;
