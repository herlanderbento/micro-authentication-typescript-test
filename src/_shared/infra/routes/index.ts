import Router from "express";
import { authenticateRoutes, authenticateSocialMediaRoutes, usersPrivateRoutes, usersPublicRoutes } from "~/modules/account/infra";

const router = Router();

router.get("/", (_, res) => {
  return res.json("Welcome to the Mirantes accounts api.");
});

router.use("/pc/users", usersPublicRoutes);
router.use("/pe/users", usersPrivateRoutes);
router.use("/auth", authenticateRoutes);
router.use(authenticateSocialMediaRoutes)

export { router };
