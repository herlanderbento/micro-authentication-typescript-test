import { RolesEnum, StatusEnum, User } from "~/modules/account/domain";

export type UserOutput = {
  id: string;
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
    return entity.toJSON();
  }
}
