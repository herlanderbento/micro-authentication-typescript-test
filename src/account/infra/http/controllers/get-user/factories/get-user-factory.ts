import { GetUserUseCase } from "~/account/application";
import { UserMongoRepository, UserModel } from "~/account/infra/db";
import { GetUserController } from "../ get-user.controller";

const repository = new UserMongoRepository(UserModel);
const useCase = new GetUserUseCase(repository);
const getUserFactory = new GetUserController(useCase);

export { getUserFactory };
