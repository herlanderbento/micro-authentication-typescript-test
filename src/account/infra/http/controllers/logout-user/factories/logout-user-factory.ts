import { LogoutUserUseCase } from "~/account/application";
import { JwtEncrypter } from "~/account/infra/cryptography";
import { UserMongoRepository, UserModel, UserTokenMongoRepository, UserTokenModel } from "~/account/infra/db";
import { LogoutUserController } from "../logout-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();

const useCase = new LogoutUserUseCase(
  userRepository,
  userTokenRepository,
  jwtEncrypter
);
const logoutUserFactory = new LogoutUserController(useCase);

export { logoutUserFactory };
