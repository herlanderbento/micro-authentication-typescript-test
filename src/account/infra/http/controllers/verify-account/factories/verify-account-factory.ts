import { DayjsDateProvider } from "~/_shared/infra";
import { VerifyAccountUseCase } from "~/account/application";
import {
  UserMongoRepository,
  UserModel,
  UserCodeMongoRepository,
  UserCodeModel,
} from "~/account/infra/db";
import { VerifyAccountController } from "../verify-account.controller";

const userRepository = new UserMongoRepository(UserModel);
const userCodeRepository = new UserCodeMongoRepository(UserCodeModel);
const dateProvider = new DayjsDateProvider();

const useCase = new VerifyAccountUseCase(
  userRepository,
  userCodeRepository,
  dateProvider
);
const verifyAccountFactory = new VerifyAccountController(useCase);

export { verifyAccountFactory };
