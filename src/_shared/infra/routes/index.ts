import Router from "express";
import { usersRoutes, authenticateRoutes, authenticateSocialMediaRoutes } from "~/account/infra";


const router = Router();

router.get("/", (_, res) => {
  return res.json("Welcome to the Mirantes accounts api.");
});

router.use("/users", usersRoutes);
router.use("/auth", authenticateRoutes);
router.use(authenticateSocialMediaRoutes)

export { router };
