import { ICryptography, IDateProvider, IUseCase } from "~/_shared/application";
import { ResetPasswordUserInput } from "./reset-password-user.input";
import {
  IUserRepository,
  IUserTokenRepository,
  User,
} from "~/account/domain";

import { InvalidTokenError, NotFoundError } from "~/_shared/domain";

export class ResetPasswordUserUseCase
  implements IUseCase<ResetPasswordUserInput, ResetPasswordUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private cryptography: ICryptography,
    private dateProvider: IDateProvider
  ) {}

  async execute(input: ResetPasswordUserInput): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(
      input.token
    );

    if (!userToken) {
      throw new InvalidTokenError();
    }

    const user = await this.userRepository.findById(String(userToken.userId));

    if (!user) {
      throw new NotFoundError(userToken.userId, User);
    }

    const compareIfBefore = this.dateProvider.compareIfBefore(
      userToken.expireDate?? new Date(),
      this.dateProvider.dateNow()
    );

    if (compareIfBefore) {
      throw new InvalidTokenError("Token expired!");
    }

    const hashedPassword = await this.cryptography.hash(input.password);

    user.password = hashedPassword;

    await this.userRepository.update(user);

    await this.userTokenRepository.delete(userToken.id.toString());
  }
}

export type ResetPasswordUserOutput = void;
