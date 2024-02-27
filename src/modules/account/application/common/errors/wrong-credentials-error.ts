import { StatusCodes } from "http-status-codes";
import { AppError } from "~/_shared/domain";

export class WrongCredentialsError extends AppError {
  constructor(message?: string) {
    super({
      name: "WrongCredentialsError",
      message: message ?? "Email or password incorrect!",
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
}
