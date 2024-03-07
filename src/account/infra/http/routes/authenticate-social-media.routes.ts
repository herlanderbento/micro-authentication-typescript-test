import { Router } from "express";
import {
  googleSignInOneTopFactory,
  googleSignUpOneTopFactory,
  googleSignInFactory,
  googleSignUpFactory,
  linkedinSignUpFactory,
  linkedinSignInFactory,
} from "../controllers";

const authenticateSocialMediaRoutes = Router({ mergeParams: true });

authenticateSocialMediaRoutes.post("/google/one-top/login", (req, res) =>
  googleSignInOneTopFactory.handle(req, res)
);

authenticateSocialMediaRoutes.post("/google/one-top/register", (req, res) =>
  googleSignUpOneTopFactory.handle(req, res)
);

authenticateSocialMediaRoutes.post("/google/register", (req, res) =>
  googleSignUpFactory.handle(req, res)
);

authenticateSocialMediaRoutes.post("/google/login", (req, res) =>
  googleSignInFactory.handle(req, res)
);

authenticateSocialMediaRoutes.post("/linkedin/register", (req, res) =>
  linkedinSignUpFactory.handle(req, res)
);

authenticateSocialMediaRoutes.post("/linkedin/login", (req, res) =>
  linkedinSignInFactory.handle(req, res)
);

export { authenticateSocialMediaRoutes };
