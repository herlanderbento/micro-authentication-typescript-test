import { Slug } from "~/_shared/domain";
import { RolesEnum, StatusEnum, User } from "~/modules/account/domain";

export type UserOutput = {
  id: string;
  name: string;
  slug: Slug
  email: string;
  phone?: string;
  avatar?: string;
  status?: StatusEnum;
  role?: RolesEnum;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return {
     ...entity.toJSON(),
      slug: entity.slug as Slug,
    };
  }}
