import {
  IUseCase,
  ICryptography,
  IGeneratorToken,
  IDateProvider,
} from '~/_shared/application';
import {
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from '~/modules/account/domain';
import { UserAlreadyExistsError } from '../../common';
import { CreateUserInput } from './create-user.input';

export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private cryptography: ICryptography,
    private generatorToken: IGeneratorToken,
    private dateProvider: IDateProvider
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      input.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const userWithSamePhone = await this.userRepository.findByPhone(
      input.phone
    );

    if (userWithSamePhone) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.cryptography.hash(input.password);

    const user = User.create({
      ...input,
      password: hashedPassword,
    });

    await this.userRepository.insert(user);

    const accessToken = await this.generatorToken.encrypt({
      sub: user.id,
    });

    const expireDate = this.dateProvider.addDays(7);

    const userToken = new UserToken({
      userId: user.id,
      accessToken,
      expireDate,
      origin: input.origin,
      devices: input.devices,
    });

    await this.userTokenRepository.insert(userToken);

    return {
      accessToken,
      user,
    };
  }
}

export type CreateUserOutput = {
  accessToken: string;
  user: User;
};
