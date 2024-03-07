import { UpdateUserUseCase } from "~/account/application";
import { UserMongoRepository, UserModel } from "~/account/infra/db";
import { UpdateUserController } from "../update-user.controller";

const repository = new UserMongoRepository(UserModel);
const useCase = new UpdateUserUseCase(repository);
const updateUserFactory = new UpdateUserController(useCase);

export { updateUserFactory };
