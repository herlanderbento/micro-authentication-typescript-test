import { GoogleSignInService } from "~/modules/account/application";
import { JwtEncrypter } from "~/modules/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/modules/account/infra/db";
import { SocialMediaHttpGateway } from "~/modules/account/infra/services";
import { GoogleSignInController } from "../google-sign-in.controller";

const socialMediaHttpGateway = new SocialMediaHttpGateway();
const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new GoogleSignInService(
  socialMediaHttpGateway,
  userRepository,
  userTokenRepository,
  jwtEncrypter
);

export const googleSignInFactory = new GoogleSignInController(useCase);
