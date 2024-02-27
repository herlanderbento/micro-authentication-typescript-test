import { GoogleSignUpService } from "~/modules/account/application";
import { GoogleSignUpController } from "../google-sign-up.controller";
import { JwtEncrypter } from "~/modules/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/modules/account/infra/db";
import { SocialMediaHttpGateway } from "~/modules/account/infra/services";

const socialMediaHttpGateway = new SocialMediaHttpGateway();
const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new GoogleSignUpService(
  socialMediaHttpGateway,
  userRepository,
  userTokenRepository,
  jwtEncrypter
);

export const googleSignUpFactory = new GoogleSignUpController(useCase);
