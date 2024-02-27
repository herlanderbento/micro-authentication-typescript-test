import { User } from "~/modules/account/domain";
import { IUserModelDocument } from "../models";
import { EntityID } from "~/_shared/domain";

export class UserModelMapper {
  static toModel(entity: User) {
    return {
      _id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      password: entity.password,
      avatar: entity.avatar,
      status: entity.status,
      role: entity.role,
      isEmailVerified: entity.isEmailVerified,
      isPhoneVerified: entity.isPhoneVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(raw: IUserModelDocument): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        avatar: raw.avatar,
        status: raw.status,
        isEmailVerified: raw.isEmailVerified,
        isPhoneVerified: raw.isPhoneVerified,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new EntityID(raw._id)
    );
  }
}
