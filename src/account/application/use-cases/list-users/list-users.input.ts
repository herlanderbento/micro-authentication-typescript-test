import { SortDirection } from '~/_shared/domain';
import { UserFilter } from '~/account/domain';

export type ListUsersInput = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: UserFilter | null;
};
