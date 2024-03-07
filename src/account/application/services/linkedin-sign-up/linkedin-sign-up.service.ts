import { IGeneratorToken } from "~/_shared/application";
import {
  ISocialMediaGateway,
  IUserRepository,
  IUserTokenRepository,
  User,
  UserToken,
} from "~/account/domain";
import { LinkedinSignUpInput } from "./linkedin-sign-up.input";
import { UserAlreadyExistsError } from "../../common";

export class LinkedinSignUpService {
  constructor(
    private socialMediaGateway: ISocialMediaGateway,
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private generatorToken: IGeneratorToken
  ) {}

  async execute(input: LinkedinSignUpInput): Promise<void> {
    const payload =
      await this.socialMediaGateway.findLinkedinAccessTokenByPayload(
        input.redirectUri,
        input.code
      );

    const userInfo = await this.socialMediaGateway.findGoogleAccessTokenByToken(
      payload.access_token
    );

    console.log(payload, userInfo)

    // const userWithSameEmail = await this.userRepository.findByEmail(
    //   userInfo.email
    // );

    // if (userWithSameEmail) {
    //   throw new UserAlreadyExistsError();
    // }

    // const user = User.create({
    //   name: userInfo.name,
    //   email: userInfo.email,
    // });

    // await this.userRepository.insert(user);

    // const accessToken = await this.generatorToken.encrypt({
    //   sub: user.id.toString(),
    // });

    // const userToken = new UserToken({
    //   userId: user.id,
    //   accessToken,
    //   origin: input.origin,
    // });

    // await this.userTokenRepository.insert(userToken);

    // return {
    //   accessToken,
    //   user,
    // };
  }
}

export type LinkedinSignUpOutput = {
  accessToken: string;
  user: User;
};
