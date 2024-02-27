import { ICryptography, IUseCase } from "~/_shared/application";
import { ChangePasswordUserInput } from "./change-password-user.input";
import { IUserRepository, User } from "~/modules/account/domain";
import { NotFoundError } from "~/_shared/domain";
import { UserPasswordMatchError } from "../../common/errors/user-password-match.error";

export class ChangePasswordUserUseCase
  implements IUseCase<ChangePasswordUserInput, ChangePasswordOutput>
{
  constructor(
    private usersRepository: IUserRepository,
    private cryptography: ICryptography
  ) {}

  async execute(input: ChangePasswordUserInput): Promise<ChangePasswordOutput> {
    if (input.password === input.oldPassword) {
      throw new UserPasswordMatchError();
    }

    const user = await this.usersRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError(input.id, User);
    }

    if (
      input.oldPassword &&
      !(await this.cryptography.compare(input.oldPassword, user.password))
    ) {
      throw new UserPasswordMatchError("Password does not match");
    }

    const hashedPassword = await this.cryptography.hash(input.password);

    user.password = hashedPassword

    await this.usersRepository.update(user);
  }
}

export type ChangePasswordOutput = void;
