import { IGeneratorToken } from "~/_shared/application";
import {
  ISocialMediaGateway,
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/modules/account/domain";
import { LinkedinSignInInput } from "./linkedin-sign-in.input";
import { UserNotFoundError } from "../../common";

export class LinkedinSignInService {
  constructor(
    private socialMediaGateway: ISocialMediaGateway,
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(input: LinkedinSignInInput): Promise<LinkedinSignInOutput> {
    const payload =
      await this.socialMediaGateway.findLinkedinAccessTokenByPayload(
        input.redirectUri,
        input.code
      );

    const userInfo = await this.socialMediaGateway.findGoogleAccessTokenByToken(
      payload.access_token
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
      origin: input.origin,
    });

    await this.userTokenRepository.insert(userToken);

    return {
      accessToken,
      user,
    };
  }
}

export type LinkedinSignInOutput = {
  accessToken: string;
  user: User;
};
