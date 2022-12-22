import express from "express";
import accountController from "../controllers/account_controller.js";
import authController from "../controllers/auth_controller.js";
import authSessionController from "../controllers/auth_session_controller.js";
import authTokenController from "../controllers/auth_token_controller.js";
import validateLoginDto from "../DTO/validate_login_dto.js";
const router = express.Router();

// account routes
router.get("/account/:guid", accountController.listUser);
router.post("/account/", accountController.addUser);
router.patch("/account/", accountController.updateUser);
router.delete("/account/", accountController.deleteUser);
//routes auth

router.get("/auth/public", authController.authPublic);
router.post("/auth/autenticado", authController.authAutenticado);
router.post("/auth/autorizado", authController.authAutorizado);

//routes auth session
router.post("/auth-session/login", authSessionContoller.authSessionLogin);
router.get("/auth-session/profile", authSessionController.authSessionProfile);

//routes auth token
router.post(
  "/auth-token/login",
  validateLoginDto,
  authTokenController.authTokenLogin
);
router.get("/auth-token/profile", authTokenController.authTokenProfile);

export default router;
