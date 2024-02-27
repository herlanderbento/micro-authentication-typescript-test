import { LinkedinSignUpService } from "~/modules/account/application";
import { JwtEncrypter } from "~/modules/account/infra/cryptography";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "~/modules/account/infra/db";
import { SocialMediaHttpGateway } from "~/modules/account/infra/services";
import { LinkedinSignUpController } from "../linkedin-sign-up.controller";

const socialMediaHttpGateway = new SocialMediaHttpGateway();
const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new LinkedinSignUpService(
  socialMediaHttpGateway,
  userRepository,
  userTokenRepository,
  jwtEncrypter
);

export const linkedinSignUpFactory = new LinkedinSignUpController(useCase);
