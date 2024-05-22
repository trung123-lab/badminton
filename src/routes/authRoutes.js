import { Router } from "express";
import {
  showLogin,
  login,
  showRegister,
  register,
} from "../controllers/authController.js"; // Đảm bảo đường dẫn chính xác

const router = Router();

router.get("/login", showLogin);
router.post("/login", login);
router.get("/register", showRegister);
router.post("/register", register);

export default router;
