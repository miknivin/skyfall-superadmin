import express from "express";
import { validateAdminRequest } from "./../middlewares/validateAdminRequest.js";
import {
  createAdminRequest,
  getAllAdminRequests,
  getAdminRequestById,
  acceptAdminRequest,
} from "../controllers/adminController.js";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/admin/request")
  .post(validateAdminRequest, createAdminRequest)
  .get(isAuthenticateUser, authorizeRoles("super_admin"), getAllAdminRequests);

router
  .route("/admin/request/:id")
  .get(isAuthenticateUser, authorizeRoles("super_admin"), getAdminRequestById);

router
  .route("/admin/request/accept")
  .post(isAuthenticateUser, authorizeRoles("super_admin"), acceptAdminRequest);
export default router;
