import { StatusCodes } from "http-status-codes";
import { AppError } from "~/_shared/domain/errors";

export class UserNotFoundError extends AppError {
  constructor(message?: string) {
    super({
      name: "UserNotFoundError",
      message: message ?? "User not found",
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
}
