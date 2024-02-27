import { EntityID } from "~/_shared/domain/value-object/entity-id.vo";
import { Types } from "mongoose";
import { UserToken, UserTokenProps } from "~/modules/account/domain";

export type IUserTokenModelDocument = Document & {
  _id: Types.UUID;
} & UserTokenProps;

export class UserTokenModelMapper {
  static toModel(entity: UserToken) {
    return {
      _id: entity.id,
      userId: entity.userId,
      accessToken: entity.accessToken,
      refreshToken: entity.refreshToken,
      expireDate: entity.expireDate,
      origin: entity.origin,
      devices: entity.devices,
      createdAt: entity.createdAt,
    };
  }

  static toEntity(raw: IUserTokenModelDocument): UserToken {
    return new UserToken(
      {
        userId: raw.userId,
        accessToken: raw.accessToken,
        refreshToken: raw.refreshToken,
        expireDate: raw.expireDate,
        origin: raw.origin,
        devices: raw.devices,
        createdAt: raw.createdAt,
      },
      new EntityID(String(raw._id))
    );
  }
}
