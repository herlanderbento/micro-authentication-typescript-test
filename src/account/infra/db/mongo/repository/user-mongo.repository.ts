import { NotFoundError } from '~/_shared/domain/errors';
import { UserModel } from '../models';
import { UserModelMapper } from '../mappers';
import {
  IUserRepository,
  User,
  UserSearchParams,
  UserSearchResult,
} from '~/account/domain';

export class UserMongoRepository implements IUserRepository {
  constructor(private userModel: typeof UserModel) {}

  async insert(entity: User): Promise<void> {
    const modelProps = UserModelMapper.toModel(entity);
    await this.userModel.create(modelProps);
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await this.userModel.findOne({
      email,
    });

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const model = await this.userModel.findOne({
      phone,
    });

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async findById(id: string): Promise<User | null> {
    const model = await this.userModel.findOne({
      _id: id,
    });

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async findBySlug(slug: string): Promise<User | null> {
    const model = await this.userModel.findOne({
      slug,
    });

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async update(entity: User): Promise<void> {
    const modelProps = UserModelMapper.toModel(entity);

    const affectedRows = await this.userModel.findByIdAndUpdate(
      entity.id.toString(),
      modelProps
    );

    if (!affectedRows) {
      throw new NotFoundError(entity.id.toString(), this.getEntity());
    }
  }

  async search(props: UserSearchParams): Promise<UserSearchResult> {
    const skip = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const models = await this.userModel
      .find({
        ...(props.filter && {
          $or: [
            { name: { $regex: new RegExp(props.filter, 'i') } },
            { email: { $regex: new RegExp(props.filter, 'i') } },
          ],
        }),
      })
      .skip(skip)
      .limit(limit)
      .lean();

    const count = await this.userModel.countDocuments(models);

    return new UserSearchResult({
      items: models.map((model) => {
        return UserModelMapper.toEntity(model);
      }),
      currentPage: props.page,
      perPage: props.perPage,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => User {
    return User;
  }
}
