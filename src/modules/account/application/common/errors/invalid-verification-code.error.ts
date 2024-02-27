import { StatusCodes } from "http-status-codes";
import { AppError } from "~/_shared/domain";

export class InvalidVerificationCodeError extends AppError {
  constructor(message?: string) {
    super({
      name: "InvalidVerificationCodeError",
      message: message ?? "Invalid verification code",
      statusCode: StatusCodes.CONFLICT,
    });
  }
}
