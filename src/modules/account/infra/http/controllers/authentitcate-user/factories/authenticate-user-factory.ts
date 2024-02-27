import { DayjsDateProvider } from "~/_shared/infra";
import { AuthenticateUserUseCase } from "~/modules/account/application";
import {
  BcryptHasher,
  JwtEncrypter,
} from "~/modules/account/infra/cryptography";
import {
  UserMongoRepository,
  UserModel,
  UserTokenMongoRepository,
  UserTokenModel,
} from "~/modules/account/infra/db";
import { AuthenticateUserController } from "../authentitcate-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const cryptographyHasher = new BcryptHasher();
const jwtEncrypter = new JwtEncrypter();
const dateProvider = new DayjsDateProvider();

const useCase = new AuthenticateUserUseCase(
  userRepository,
  userTokenRepository,
  cryptographyHasher,
  jwtEncrypter,
  dateProvider
);
const authenticateUserFactory = new AuthenticateUserController(useCase);

export { authenticateUserFactory };
