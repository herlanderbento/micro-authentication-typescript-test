import { IGeneratorToken, IUseCase } from "~/_shared/application";
import {
  IUserRepository,
  IUserTokenRepository,
} from "~/account/domain";
import { UserNotFoundError } from "../../common";
import { LogoutUserDecrypt, LogoutUserInput } from "./logout-user.input";
import { InvalidTokenError } from "~/_shared/domain";

export class LogoutUserUseCase
  implements IUseCase<LogoutUserInput, LogoutUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(input: LogoutUserInput): Promise<void> {
    const token = await this.generatorToken.decrypt<LogoutUserDecrypt>(
      input.token
    );

    const user = await this.userRepository.findById(token.sub);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userToken = await this.userTokenRepository.findByToken(input.token);

    if (!userToken) {
      throw new InvalidTokenError();
    }

    await this.userTokenRepository.delete(userToken.id.toString());
  }
}

export type LogoutUserOutput = void;
