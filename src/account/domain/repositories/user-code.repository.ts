import { IRepository } from "~/_shared/domain";
import { UserCode } from "../entities";

export interface IUserCodeRepository
  extends Pick<IRepository<UserCode>, "insert"> {
  findByCode(code: string): Promise<UserCode | null>;
  findByUserId(userId: string): Promise<UserCode | null>;
  deleteByUserId(userId: string): Promise<void>;
}
