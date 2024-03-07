import { EntityID } from "~/_shared/domain/value-object/entity-id.vo";
import { Types } from "mongoose";
import { UserCode, UserCodeProps } from "~/account/domain";

export type IUserCodeModelDocument = Document & {
  _id: Types.UUID;
} & UserCodeProps;

export class UserCodeModelMapper {
  static toModel(entity: UserCode) {
    return {
      _id: entity.id,
      userId: entity.userId,
      code: entity.code,
      expireDate: entity.expireDate,
      createdAt: entity.createdAt,
    };
  }

  static toEntity(raw: IUserCodeModelDocument): UserCode {
    return new UserCode(
      {
        userId: raw.userId,
        code: raw.code,
        expireDate: raw.expireDate,
        createdAt: raw.createdAt,
      },
      new EntityID(String(raw._id))
    );
  }
}
