import { jwtDecode } from "jwt-decode";
import { IGeneratorToken } from "~/_shared/application";
import {
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/account/domain";
import { UserNotFoundError } from "../../common";
import {
  GoogleSignInOneTopInput,
  JwtPayload,
} from "./google-sign-in-one-top.input";

export class GoogleSignInOneTopService {
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(
    input: GoogleSignInOneTopInput
  ): Promise<GoogleSignInOneTopOutput> {
    const decoded = jwtDecode<JwtPayload>(input.credential);

    const user = await this.userRepository.findByEmail(decoded.email);

    if (!user) {
      throw new UserNotFoundError();
    }

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

export type GoogleSignInOneTopOutput = {
  accessToken: string;
  user: User;
};
