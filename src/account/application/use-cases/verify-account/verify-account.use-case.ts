import { IDateProvider, IUseCase } from "~/_shared/application";
import {
  IUserCodeRepository,
  IUserRepository,
  StatusEnum,
  User,
} from "~/account/domain";
import { InvalidVerificationCodeError, UserNotFoundError } from "../../common";

import { VerifyAccountInput } from "./verify-account.input";

export class VerifyAccountUseCase
  implements IUseCase<VerifyAccountInput, VerifyAccountOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userCodeRepository: IUserCodeRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute(input: VerifyAccountInput): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userCode = await this.userCodeRepository.findByUserId(user.id.toString());

    if (!userCode || userCode.code !== input.code) {
      throw new InvalidVerificationCodeError();
    }

    const compareIfBefore = this.dateProvider.compareIfBefore(
      userCode.expireDate,
      this.dateProvider.dateNow()
    );

    if (compareIfBefore) {
      throw new InvalidVerificationCodeError("Code expired!");
    }

    user.status = StatusEnum.Active;

    await this.userRepository.update(user);

    await this.userCodeRepository.deleteByUserId(userCode.userId.toString());
  }
}

export type VerifyAccountOutput = void;
