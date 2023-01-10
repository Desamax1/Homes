import { Router } from "express";
import { GetUser, AddUser, LoginUser } from "../controllers/User.controller.js";

const UserRouter = Router();

UserRouter.get("/:id", GetUser);

UserRouter.post("/register", AddUser);
UserRouter.post("/login", LoginUser);

export default UserRouter;