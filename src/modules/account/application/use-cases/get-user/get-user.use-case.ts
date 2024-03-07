import { IUseCase } from '~/_shared/application';
import { UserNotFoundError, UserOutput, UserOutputMapper } from '../../common';
import { IUserRepository } from '~/modules/account/domain';

export interface GetUserUseCaseInput {
  slug: string;
}

export class GetUserUseCase
  implements IUseCase<GetUserUseCaseInput, GetUserUseCaseOutput>
{
  constructor(private userRepository: IUserRepository) {}

  async execute(input: GetUserUseCaseInput): Promise<UserOutput> {
    const user = await this.userRepository.findBySlug(input.slug);

    if (!user) {
      throw new UserNotFoundError();
    }

    return UserOutputMapper.toOutput(user);
  }
}

export type GetUserUseCaseOutput = UserOutput;
