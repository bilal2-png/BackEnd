import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"
import { upload } from '../middlewares/multer.middlerware.js';
const router = Router();

// Route for  a user
router.route("/register").post(
    // Middleware to validate user uploaded files
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]
    )
    ,
    registerUser)

export default router;