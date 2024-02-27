import {
  DayjsDateProvider,
  RabbitMQServices,
  NodeMailerProvider,
} from "~/_shared/infra";
import { SendVerifyCodeUserUseCase } from "~/modules/account/application";
import {
  UserMongoRepository,
  UserModel,
  UserCodeMongoRepository,
  UserCodeModel,
} from "~/modules/account/infra/db";
import { SendVerifyCodeUserController } from "../send-verify-code-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userCodeRepository = new UserCodeMongoRepository(UserCodeModel);
const dateProvider = new DayjsDateProvider();
const rabbitMqService = new RabbitMQServices("Verify_Code");
const mailProvider = new NodeMailerProvider();

const useCase = new SendVerifyCodeUserUseCase(
  userRepository,
  userCodeRepository,
  dateProvider,
  mailProvider
);
const sendVerifyCodeUserFactory = new SendVerifyCodeUserController(useCase);

export { sendVerifyCodeUserFactory };
