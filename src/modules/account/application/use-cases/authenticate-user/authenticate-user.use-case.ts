import {
  ICryptography,
  IDateProvider,
  IGeneratorToken,
  IUseCase,
} from "~/_shared/application";
import {
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/modules/account/domain";
import { WrongCredentialsError } from "../../common/errors/wrong-credentials-error";
import { AuthenticateUserInput } from "./authenticate-user.input";

export class AuthenticateUserUseCase
  implements IUseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private cryptography: ICryptography,
    private generatorToken: IGeneratorToken,
    private dateProvider: IDateProvider
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.cryptography.compare(
      input.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }

    const accessToken = await this.generatorToken.encrypt({
      sub: user.id.toString(),
    });

    const expireDate = this.dateProvider.addDays(7);

    const userToken = new UserToken({
      userId: user.id,
      accessToken,
      expireDate,
      origin: input.origin,
      devices: input.devices,
    });

    // Adicionar origem e dispositivos.

    await this.userTokenRepository.insert(userToken);

    return {
      accessToken,
      refreshToken: userToken.refreshToken,
      user,
    };
  }
}

export type AuthenticateUserOutput = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};
