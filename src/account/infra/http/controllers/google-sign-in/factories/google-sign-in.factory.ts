import { GoogleSignInService } from "~/account/application";
import { JwtEncrypter } from "~/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/account/infra/db";
import { SocialMediaHttpGateway } from "~/account/infra/services";
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
