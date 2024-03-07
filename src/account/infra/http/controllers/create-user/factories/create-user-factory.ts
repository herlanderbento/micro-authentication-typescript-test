import { DayjsDateProvider, RabbitMQAdapter } from "~/_shared/infra";
import { CreateUserUseCase } from "~/account/application";
import {
  BcryptHasher,
  JwtEncrypter,
} from "~/account/infra/cryptography";
import {
  UserMongoRepository,
  UserModel,
  UserCodeMongoRepository,
  UserCodeModel,
  UserTokenMongoRepository,
  UserTokenModel,
} from "~/account/infra/db";
import { CreateUserController } from "../create-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);

const cryptographyHasher = new BcryptHasher();
const jwtEncrypter = new JwtEncrypter();
const dateProvider = new DayjsDateProvider();
const queue = new RabbitMQAdapter("WelcomeToMIrantes");
const useCase = new CreateUserUseCase(
  userRepository,
  userTokenRepository,
  cryptographyHasher,
  jwtEncrypter,
  dateProvider,
  queue
);
const createUserFactory = new CreateUserController(useCase);

export { createUserFactory };
