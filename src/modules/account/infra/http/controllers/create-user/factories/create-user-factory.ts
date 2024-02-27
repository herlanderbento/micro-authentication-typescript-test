import { DayjsDateProvider } from "~/_shared/infra";
import { CreateUserUseCase } from "~/modules/account/application";
import {
  BcryptHasher,
  JwtEncrypter,
} from "~/modules/account/infra/cryptography";
import {
  UserMongoRepository,
  UserModel,
  UserCodeMongoRepository,
  UserCodeModel,
  UserTokenMongoRepository,
  UserTokenModel,
} from "~/modules/account/infra/db";
import { CreateUserController } from "../create-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userCodeRepository = new UserCodeMongoRepository(UserCodeModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);

const cryptographyHasher = new BcryptHasher();
const jwtEncrypter = new JwtEncrypter();
const dateProvider = new DayjsDateProvider();
const useCase = new CreateUserUseCase(
  userRepository,
  // userCodeRepository,
  userTokenRepository,
  cryptographyHasher,
  jwtEncrypter,
  dateProvider
);
const createUserFactory = new CreateUserController(useCase);

export { createUserFactory };
