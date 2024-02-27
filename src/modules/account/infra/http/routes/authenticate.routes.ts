import { Router } from "express";
import {
  authenticateUserFactory,
  logoutUserFactory,
  resetPasswordUserFactory,
  sendForgotPasswordFactory,
  sendVerifyCodeUserFactory,
  verifyAccountFactory,
} from "../controllers";
import { ensureAuthenticated } from "../middleware";

const authenticateRoutes = Router({ mergeParams: true });

authenticateRoutes.post("/login", (req, res) =>
  authenticateUserFactory.handle(req, res)
);

authenticateRoutes.delete("/logout", ensureAuthenticated, (req, res) =>
  logoutUserFactory.handle(req, res)
);

authenticateRoutes.post("/forgot-password", (req, res) =>
  sendForgotPasswordFactory.handle(req, res)
);

authenticateRoutes.post("/reset-password", (req, res) =>
  resetPasswordUserFactory.handle(req, res)
);

authenticateRoutes.post("/verify-code", (req, res) =>
  verifyAccountFactory.handle(req, res)
);

authenticateRoutes.post("/send-verify-code", (req, res) =>
  sendVerifyCodeUserFactory.handle(req, res)
);

export { authenticateRoutes };
