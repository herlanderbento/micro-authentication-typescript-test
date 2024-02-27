import { jwtDecode } from "jwt-decode";
import { IGeneratorToken } from "~/_shared/application";
import {
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/modules/account/domain";
import { UserAlreadyExistsError } from "../../common";
import {
  GoogleSignUpOneTopInput,
  IJwtPayload,
} from "./google-sign-up-one-top.input";

export class GoogleSignUpOneTopService {
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(
    input: GoogleSignUpOneTopInput
  ): Promise<GoogleSignUpOneTopOutput> {
    const decoded = jwtDecode<IJwtPayload>(input.credential);

    const userWithSameEmail = await this.userRepository.findByEmail(
      decoded.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = User.create({
      name: decoded.name,
      email: decoded.email,
    });

    await this.userRepository.insert(user);

    const accessToken = await this.generatorToken.encrypt({
      sub: user.id.toString(),
    });

    const userToken = new UserToken({
      userId: user.id,
      accessToken,
      origin: input.origin,
    });

    await this.userTokenRepository.insert(userToken);

    return {
      accessToken,
      user,
    };
  }
}

export type GoogleSignUpOneTopOutput = {
  accessToken: string;
  user: User;
};
