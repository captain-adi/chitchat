import { Router } from "express";
import {
  deleteUser,
  getUser,
  updateProfile,
} from "../controllers/user_controller.js";
import upload from "../middleware/multer_middleware.js";
const router = Router();

router.route("/me").get(getUser);
router.route("/me").delete(deleteUser);
router.route("/me").put(upload.single("avatar"), updateProfile);

export default router;
