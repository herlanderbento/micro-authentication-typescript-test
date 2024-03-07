import { IGeneratorToken } from "~/_shared/application";
import {
  IGoogleServiceGateway,
  ISocialMediaGateway,
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/account/domain";
import { UserNotFoundError } from "../../common";
import { GoogleSignInInput } from "./google-sign-in.input";

export class GoogleSignInService {
  constructor(
    private socialMediaGateway: ISocialMediaGateway,
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(input: GoogleSignInInput): Promise<GoogleSignInOutput> {
    const userInfo = await this.socialMediaGateway.findGoogleAccessTokenByToken(
      input.accessToken
    );

    const user = await this.userRepository.findByEmail(userInfo.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const accessToken = await this.generatorToken.encrypt({
      sub: user.id.toString(),
    });

    const userToken = new UserToken({
      userId: user.id,
      accessToken,
    });

    await this.userTokenRepository.insert(userToken);

    return {
      accessToken,
      user,
    };
  }
}

export type GoogleSignInOutput = {
  accessToken: string;
  user: User;
};
