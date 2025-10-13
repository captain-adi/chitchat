import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateProfile,
} from "../controllers/user_controller.js";
import upload from "../middleware/multer_middleware.js";
import authMiddleware from "../middleware/auth_middleware.js";
const router = Router();

router.route("/me").get(getUser);
router.route("/me").delete(deleteUser);
router
  .route("/me/update-profile")
  .put(authMiddleware, upload.single("avatar"), updateProfile);

router.route("/all").get(authMiddleware, getAllUser);
export default router;
