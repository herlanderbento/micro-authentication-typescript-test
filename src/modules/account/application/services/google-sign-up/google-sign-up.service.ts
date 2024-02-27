import { IGeneratorToken } from "~/_shared/application";
import {
  IGoogleServiceGateway,
  ISocialMediaGateway,
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/modules/account/domain";
import { UserAlreadyExistsError, UserNotFoundError } from "../../common";
import { GoogleSignUpInput } from "./google-sign-up.input";

export class GoogleSignUpService {
  constructor(
    private socialMediaGateway: ISocialMediaGateway,
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(input: GoogleSignUpInput): Promise<GoogleSignUpOutput> {
    const userInfo = await this.socialMediaGateway.findGoogleAccessTokenByToken(
      input.accessToken
    );

    const userWithSameEmail = await this.userRepository.findByEmail(
      userInfo.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = User.create({
      name: userInfo.name,
      email: userInfo.email,
    });

    await this.userRepository.insert(user);

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

export type GoogleSignUpOutput = {
  accessToken: string;
  user: User;
};
