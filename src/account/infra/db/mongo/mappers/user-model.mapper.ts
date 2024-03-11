import { User } from "~/account/domain";
import { IUserModelDocument } from "../models";
import { EntityID, Slug } from "~/_shared/domain";

export class UserModelMapper {
  static toModel(entity: User) {
    return {
      _id: entity.id,
      name: entity.name,
      slug: entity.slug.value,
      email: entity.email,
      phone: entity.phone,
      password: entity.password,
      avatar: entity.avatar,
      status: entity.status,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(raw: IUserModelDocument): User {
    return User.create(
      {
        name: raw.name,
        slug: raw.slug,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        avatar: raw.avatar,
        status: raw.status,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new EntityID(raw._id)
    );
  }
}
