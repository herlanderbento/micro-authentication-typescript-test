import { LinkedinSignInService } from "~/account/application";
import { JwtEncrypter } from "~/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/account/infra/db";
import { SocialMediaHttpGateway } from "~/account/infra/services";
import { LinkedinSignInController } from "../linkedin-sign-in.controller";

const socialMediaHttpGateway = new SocialMediaHttpGateway();
const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new LinkedinSignInService(
  socialMediaHttpGateway,
  userRepository,
  userTokenRepository,
  jwtEncrypter
);

export const linkedinSignInFactory = new LinkedinSignInController(useCase);
