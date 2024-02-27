import { GoogleSignUpOneTopService } from "~/modules/account/application";
import { JwtEncrypter } from "~/modules/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/modules/account/infra/db";
import { GoogleSignUpOneTopController } from "../google-sign-up-one-top.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new GoogleSignUpOneTopService(
  userRepository,
  userTokenRepository,
  jwtEncrypter
);

export const googleSignUpOneTopFactory = new GoogleSignUpOneTopController(
  useCase
);
