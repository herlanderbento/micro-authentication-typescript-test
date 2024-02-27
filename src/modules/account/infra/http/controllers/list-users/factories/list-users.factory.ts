import { ListUsersUseCase } from "~/modules/account/application";
import { UserMongoRepository, UserModel } from "~/modules/account/infra/db";
import { ListUsersController } from "../list-users.controller";

const repository = new UserMongoRepository(UserModel);

const useCase = new ListUsersUseCase(repository);

const listUsersFactory = new ListUsersController(useCase);

export { listUsersFactory };
