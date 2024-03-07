import {
  IUseCase,
  PaginationOutputMapper,
  PaginationOutput,
} from '~/_shared/application';
import {
  IUserRepository,
  UserSearchParams,
  UserSearchResult,
} from '~/account/domain';
import { UserOutputMapper, UserOutput } from '../../common';
import { ListUsersInput } from './list-users.input';

export class ListUsersUseCase
  implements IUseCase<ListUsersInput, ListUsersOutput>
{
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute(input: ListUsersInput): Promise<ListUsersOutput> {
    const params = new UserSearchParams(input);
    const searchResult = await this.usersRepository.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: UserSearchResult): ListUsersOutput {
    const { items: _items } = searchResult;
    const items = _items.map((item) => {
      return UserOutputMapper.toOutput(item);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListUsersOutput = PaginationOutput<UserOutput>;
