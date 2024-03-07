import { ChangePasswordUserUseCase } from "~/account/application";
import { BcryptHasher } from "~/account/infra/cryptography";
import { UserMongoRepository, UserModel } from "~/account/infra/db";
import { ChangePasswordUserController } from "../change-password-user.controller";



const repository = new UserMongoRepository(UserModel);
const cryptographyHasher = new BcryptHasher();
const useCase = new ChangePasswordUserUseCase(repository, cryptographyHasher);
const changePasswordUserFactory = new ChangePasswordUserController(useCase);

export { changePasswordUserFactory };
