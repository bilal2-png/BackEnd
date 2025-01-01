import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"

const router = Router();

// Route for  a user
router.route("/register").post(
    // Middleware to validate user input
    m
    ,registerUser)

export default router;