import { Router } from "express";
import {
  showSchedule,
  bookSchedule,
  showBill,
} from "../controllers/scheduleController.js"; // Đảm bảo đường dẫn chính xác

const router = Router();

router.get("/schedule", showSchedule);
router.post("/schedule", bookSchedule);
router.get("/bill", showBill);

export default router;
