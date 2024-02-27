import { IUserCodeRepository, UserCode } from "~/modules/account/domain";
import { UserCodeModelMapper } from "../mappers/user-code-model.mapper";
import { UserCodeModel } from "../models/user-code.model";

export class UserCodeMongoRepository implements IUserCodeRepository {
  constructor(private userCodeModel: typeof UserCodeModel) {}

  async insert(entity: UserCode): Promise<void> {
    const modelProps = UserCodeModelMapper.toModel(entity);
    await this.userCodeModel.create(modelProps);
  }

  async findByCode(code: string): Promise<UserCode | null> {
    const model = await this.userCodeModel.findOne({
      code,
    });

    return model ? UserCodeModelMapper.toEntity(model) : null;
  }

  async findByUserId(userId: string): Promise<UserCode | null> {
    const model = await this.userCodeModel
      .findOne({
        userId,
      })
      .sort({ createdAt: -1 });

    return model ? UserCodeModelMapper.toEntity(model) : null;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.userCodeModel.deleteMany({ userId });
  }
}
