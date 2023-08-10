import mongoose from "mongoose";
import  express from "express";
import { createRegister, fetchAll, login } from "../Controller/authController.js";


const router = express.Router();

router.post("/register", createRegister);

// fetch all products
router.get('/', fetchAll);

// fetch a specific user and validate email and password
router.post('/login', login);

export default router;

