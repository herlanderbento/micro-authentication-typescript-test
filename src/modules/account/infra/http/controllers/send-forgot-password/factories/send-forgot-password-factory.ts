import { DayjsDateProvider, NodeMailerProvider } from "~/_shared/infra";
import { SendForgotPasswordUseCase } from "~/modules/account/application";
import { JwtEncrypter } from "~/modules/account/infra/cryptography";
import { UserMongoRepository, UserModel, UserTokenMongoRepository, UserTokenModel } from "~/modules/account/infra/db";
import { SendForgotPasswordController } from "../send-forgot-password.controller";

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();
const dateProvider = new DayjsDateProvider();
const mailProvider = new NodeMailerProvider();

const useCase = new SendForgotPasswordUseCase(
  userRepository,
  userTokenRepository,
  dateProvider,
  mailProvider,
  jwtEncrypter
);

const sendForgotPasswordFactory = new SendForgotPasswordController(useCase);

export { sendForgotPasswordFactory };
