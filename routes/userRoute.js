import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js"; // Make sure to include the .js extension

const userRouter = express.Router();

// Route for registering a user
userRouter.post("/register", registerUser);

// Route for logging in a user
userRouter.post("/login", loginUser);

export default userRouter;
