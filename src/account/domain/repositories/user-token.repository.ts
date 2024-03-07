import { IRepository } from "~/_shared/domain";
import { UserToken } from "../entities";

export interface IUserTokenRepository
  extends Pick<IRepository<UserToken>, "insert" | "delete"> {
  findByToken(accessToken: string): Promise<UserToken | null>;
  findByRefreshToken(refreshToken: string): Promise<UserToken | null>;
  deleteByUserIdAndToken(userId: string, token: string): Promise<void>;
}
