import { GetUserUseCase } from "~/modules/account/application";
import { UserMongoRepository, UserModel } from "~/modules/account/infra/db";
import { GetUserController } from "../ get-user.controller";

const repository = new UserMongoRepository(UserModel);
const useCase = new GetUserUseCase(repository);
const getUserFactory = new GetUserController(useCase);

export { getUserFactory };
