import { IUseCase } from "~/_shared/application";
import { IUserRepository, User } from "~/account/domain";
import {
  UserAlreadyExistsError,
  UserOutput,
  UserOutputMapper,
} from "../../common";
import { UpdateUserInput } from "./update-user.input";
import { NotFoundError } from "~/_shared/domain";

export class UpdateUserUseCase
  implements IUseCase<UpdateUserInput, UpdateUserOutput>
{
  constructor(private userRepository: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError(input.id, User);
    }

    if (user.email !== input.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        input.email
      );

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError();
      }
    }

    user.update(input);

    await this.userRepository.update(user);

    return UserOutputMapper.toOutput(user);
  }
}

export type UpdateUserOutput = UserOutput;
