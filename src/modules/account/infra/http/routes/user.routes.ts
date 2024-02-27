import { Router } from "express";
import {
  changePasswordUserFactory,
  createUserFactory,
  listUsersFactory,
  updateUserFactory,
} from "../controllers";
import { ensureAuthenticated } from "../middleware";

const usersPublicRoutes = Router({ mergeParams: true });
const usersPrivateRoutes = Router({ mergeParams: true });

//Routes publics

usersPublicRoutes.post("/", (req, res) => createUserFactory.handle(req, res));

// Routes privates
usersPrivateRoutes.get("/", ensureAuthenticated, (req, res) =>
  listUsersFactory.handle(req, res)
);

usersPrivateRoutes.patch(
  "/:id/change-password",
  ensureAuthenticated,
  (req, res) => changePasswordUserFactory.handle(req, res)
);

usersPrivateRoutes.patch("/:id", ensureAuthenticated, (req, res) =>
  updateUserFactory.handle(req, res)
);

export { usersPublicRoutes, usersPrivateRoutes };
