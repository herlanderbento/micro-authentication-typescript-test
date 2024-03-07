import { GoogleSignInOneTopService } from "~/account/application";
import { JwtEncrypter } from "~/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/account/infra/db";
import { GoogleSignInOneTopController } from "../google-sign-in-one-top.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new GoogleSignInOneTopService(
  userRepository,
  userTokenRepository,
  jwtEncrypter
);

export const googleSignInOneTopFactory = new GoogleSignInOneTopController(
  useCase
);
