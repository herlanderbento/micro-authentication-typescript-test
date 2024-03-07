import { SearchParams } from "~/_shared/domain/repository/search-params";
import { SearchResult } from "~/_shared/domain/repository/search-result";
import { ISearchableRepository } from "~/_shared/domain/repository/repository-interface";
import { User } from "../entities";

export type UserFilter = string;

export class UserSearchParams extends SearchParams<UserFilter> {}

export class UserSearchResult extends SearchResult<User> {}

export interface IUserRepository
  extends Omit<
    ISearchableRepository<User, UserFilter, UserSearchParams, UserSearchResult>,
    "delete" | "findAll" | "bulkInsert"
  > {
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findBySlug(slug: string): Promise<User | null>;
}
