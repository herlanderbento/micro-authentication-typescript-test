import {
  DayjsDateProvider,
  NodeMailerProvider,
  RabbitMQAdapter,
} from '~/_shared/infra';
import { SendForgotPasswordUseCase } from '~/account/application';
import { JwtEncrypter } from '~/account/infra/cryptography';
import {
  UserMongoRepository,
  UserModel,
  UserTokenMongoRepository,
  UserTokenModel,
} from '~/account/infra/db';
import { SendForgotPasswordController } from '../send-forgot-password.controller';

const userRepository = new UserMongoRepository(UserModel);
const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);
const jwtEncrypter = new JwtEncrypter();
const dateProvider = new DayjsDateProvider();
const queue = new RabbitMQAdapter('email.forgot-password.mirantes.queue');

const useCase = new SendForgotPasswordUseCase(
  userRepository,
  userTokenRepository,
  dateProvider,
  jwtEncrypter,
  queue
);

const sendForgotPasswordFactory = new SendForgotPasswordController(useCase);

export { sendForgotPasswordFactory };
