import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
  getUserById,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.get("/user/:id",getUserById); // ✅ added this line

export default router;
