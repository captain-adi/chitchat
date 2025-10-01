import { Router } from "express";
import {
  deleteUser,
  getUser,
  updateProfile,
} from "../controllers/user_controller.js";
const router = Router();

router.route("/me").get(getUser);
router.route("/me").delete(deleteUser);
router.route("/me").put(updateProfile);

export default router;
