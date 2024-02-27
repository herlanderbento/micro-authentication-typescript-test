import { IDateProvider, IMailProvider, IUseCase } from "~/_shared/application";
import {
  IUserCodeRepository,
  IUserRepository,
  UserCode,
} from "~/modules/account/domain";
import { UserNotFoundError } from "../../common";
import { SendVerifyCodeUserInput } from "./send-verify-code-user.input";
import { IMessageRepository } from "~/_shared/domain";
import { resolve } from "path";

export class SendVerifyCodeUserUseCase
  implements IUseCase<SendVerifyCodeUserInput, SendVerifyCodeUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userCodeRepository: IUserCodeRepository,
    private dateProvider: IDateProvider,
    // private messageRepository: IMessageRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(input: SendVerifyCodeUserInput): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "views",
      "emails",
      "verify-code.hbs"
    );

    const expireDate = this.dateProvider.addSeconds(60);

    const userCode = new UserCode({
      userId: user.id,
      expireDate,
    });

    await this.userCodeRepository.insert(userCode);

    const variables = {
      name: user.name,
      code: userCode.code,
    };

    await this.mailProvider.sendMail(
      input.email,
      "Código de verificação",
      variables,
      templatePath
    );
    
    // await this.messageRepository.sendMessage(message);
  }
}

export type SendVerifyCodeUserOutput = void;
