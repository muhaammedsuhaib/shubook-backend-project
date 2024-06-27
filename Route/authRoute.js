import express from "express";
import { changePassword, login, signup } from "../Controller/authController.js";

const route=express.Router();

route.put('/:userId/change',changePassword);

route.post("/register",signup);
route.post("/login",login);

export default route;