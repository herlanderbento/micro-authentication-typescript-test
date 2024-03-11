import { Router } from "express";
import {
  changePasswordUserFactory,
  createUserFactory,
  getUserFactory,
  listUsersFactory,
  updateUserFactory,
} from "../controllers";
import { ensureAuthenticated } from "../middleware";

const usersRoutes = Router({ mergeParams: true });

//Routes publics

usersRoutes.post("/", (req, res) => createUserFactory.handle(req, res));

// Routes privates
usersRoutes.get("/", ensureAuthenticated, (req, res) =>
  listUsersFactory.handle(req, res)
);

usersRoutes.get("/:slug", ensureAuthenticated, (req, res) =>
  getUserFactory.handle(req, res)
);

usersRoutes.patch(
  "/:id/change-password",
  ensureAuthenticated,
  (req, res) => changePasswordUserFactory.handle(req, res)
);

usersRoutes.patch("/:id", ensureAuthenticated, (req, res) =>
  updateUserFactory.handle(req, res)
);



export { usersRoutes };
