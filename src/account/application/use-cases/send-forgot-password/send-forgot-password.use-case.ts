import {  resolve } from "path";
import {
  IDateProvider,
  IGeneratorToken,
  IMailProvider,
  IUseCase,
} from "~/_shared/application";
import { SendForgotPasswordInput } from "./send-forgot-password.input";
import {
  IUserRepository,
  IUserTokenRepository,
  UserToken,
} from "~/account/domain";
import { UserNotFoundError } from "../../common";
import { Queue } from "~/_shared/domain";

export class SendForgotPasswordUseCase
  implements IUseCase<SendForgotPasswordInput, SendForgotPasswordOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private dateProvider: IDateProvider,
    private generatorToken: IGeneratorToken,
    private queue: Queue
  ) {}

  async execute(input: SendForgotPasswordInput): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const token = await this.generatorToken.encrypt({
      sub: user.id.toString(),
    });

    const expireDate = this.dateProvider.addDays(7);

    const userToken = new UserToken({
      userId: user.id,
      accessToken: token,
      expireDate,
    });

    await this.userTokenRepository.insert(userToken);

    const variables = {
      name: user.name,
      email: user.email,
      link: `${process.env.FORGOT_MAIL_URL}${userToken.accessToken}`,
    };

    await this.queue.publish(variables)
  }
}

export type SendForgotPasswordOutput = void;
