import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../shared/middlewares/verify.token";

const router = Router();
const userController = new UserController();

router
  .route("/user")
  .get(auth.verifyToken, userController.list)
  .post(userController.insert);
router.route("/login").post(userController.login);
router.route("/coins").get(auth.verifyToken, userController.listCoin);
router.route("/top").get(auth.verifyToken, userController.topCripto);
router.route("/cripto").post(userController.insertCripto);

export default router;
