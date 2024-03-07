import { IDateProvider, IMailProvider, IUseCase } from "~/_shared/application";
import {
  IUserCodeRepository,
  IUserRepository,
  UserCode,
} from "~/account/domain";
import { UserNotFoundError } from "../../common";
import { SendVerifyCodeUserInput } from "./send-verify-code-user.input";
import { resolve } from "path";
import { Queue } from "~/_shared/domain";

export class SendVerifyCodeUserUseCase
  implements IUseCase<SendVerifyCodeUserInput, SendVerifyCodeUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userCodeRepository: IUserCodeRepository,
    private dateProvider: IDateProvider,
    private queue: Queue
  ) {}

  async execute(input: SendVerifyCodeUserInput): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const expireDate = this.dateProvider.addSeconds(60);

    const userCode = new UserCode({
      userId: user.id,
      expireDate,
    });

    await this.userCodeRepository.insert(userCode);

    const variables = {
      name: user.name,
      code: userCode.code,
      email: user.email
    };

    console.log(variables);

    // await this.queue.publish(variables)
  }
}

export type SendVerifyCodeUserOutput = void;
