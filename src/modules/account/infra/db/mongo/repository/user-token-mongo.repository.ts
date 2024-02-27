import { IUserTokenRepository, UserToken } from "~/modules/account/domain";
import { UserTokenModel } from "../models";
import { UserTokenModelMapper } from "../mappers";

export class UserTokenMongoRepository implements IUserTokenRepository {
  constructor(private userTokenModel: typeof UserTokenModel) {}

  async insert(entity: UserToken): Promise<void> {
    const modelProps = UserTokenModelMapper.toModel(entity);
    await this.userTokenModel.create(modelProps);
  }

  async findByToken(accessToken: string): Promise<UserToken | null> {
    const model = await this.userTokenModel.findOne({
      accessToken,
    });

    return model ? UserTokenModelMapper.toEntity(model) : null;
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken | null> {
    const model = await this.userTokenModel.findOne({
      refreshToken,
    });

    return model ? UserTokenModelMapper.toEntity(model) : null;
  }

  async delete(id: string): Promise<void> {
    await this.userTokenModel.findOneAndDelete({
      _id: id,
    });
  }

  async deleteByUserIdAndToken(userId: string, token: string): Promise<void> {
    const accessToken = JSON.stringify(token);

    await this.userTokenModel.findOneAndDelete({
      userId: userId,
      refreshToken: accessToken,
    });
  }
}
