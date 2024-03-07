import { DayjsDateProvider } from "~/_shared/infra";
import { ResetPasswordUserUseCase } from "~/account/application";
import { BcryptHasher } from "~/account/infra/cryptography";
import {
  UserMongoRepository,
  UserModel,
  UserTokenMongoRepository,
  UserTokenModel,
} from "~/account/infra/db";
import { ResetPasswordUserController } from "../reset-password-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const cryptographyHasher = new BcryptHasher();
const dateProvider = new DayjsDateProvider();
const useCase = new ResetPasswordUserUseCase(
  userRepository,
  userTokenRepository,
  cryptographyHasher,
  dateProvider
);
const resetPasswordUserFactory = new ResetPasswordUserController(useCase);

export { resetPasswordUserFactory };
