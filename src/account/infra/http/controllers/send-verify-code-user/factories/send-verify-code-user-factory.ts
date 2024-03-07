import {
  DayjsDateProvider,
  RabbitMQAdapter,
} from "~/_shared/infra";
import { SendVerifyCodeUserUseCase } from "~/account/application";
import {
  UserMongoRepository,
  UserModel,
  UserCodeMongoRepository,
  UserCodeModel,
} from "~/account/infra/db";
import { SendVerifyCodeUserController } from "../send-verify-code-user.controller";

const userRepository = new UserMongoRepository(UserModel);
const userCodeRepository = new UserCodeMongoRepository(UserCodeModel);
const dateProvider = new DayjsDateProvider();
const queue = new RabbitMQAdapter("email.verify-code.mirantes.queue");

const useCase = new SendVerifyCodeUserUseCase(
  userRepository,
  userCodeRepository,
  dateProvider,
  queue
);
const sendVerifyCodeUserFactory = new SendVerifyCodeUserController(useCase);

export { sendVerifyCodeUserFactory };
