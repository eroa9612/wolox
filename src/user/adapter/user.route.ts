import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

router.route("/user").get(userController.list).post(userController.insert);

export default router;
