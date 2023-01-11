import { Router } from "express";
import { GetUser, AddUser, LoginUser, UpdateUser, RemoveUser, LogoutUser } from "../controllers/User.controller.js";
import { AuthUser } from "../middleware/AuthHelper.js";

const UserRouter = Router();

UserRouter.get("/logout", AuthUser, LogoutUser);
UserRouter.get("/:id", GetUser);

UserRouter.post("/register", AddUser);
UserRouter.post("/login", LoginUser);

UserRouter.put("/update", AuthUser, UpdateUser);
UserRouter.delete("/delete", AuthUser, RemoveUser);

export default UserRouter;