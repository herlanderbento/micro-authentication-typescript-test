import { DayjsDateProvider } from "~/_shared/infra";
import { ResetPasswordUserUseCase } from "~/modules/account/application";
import { BcryptHasher } from "~/modules/account/infra/cryptography";
import {
  UserMongoRepository,
  UserModel,
  UserTokenMongoRepository,
  UserTokenModel,
} from "~/modules/account/infra/db";
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
