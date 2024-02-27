import { StatusCodes } from 'http-status-codes';
import { AppError } from '~/_shared/domain/errors';

export class UserAlreadyExistsError extends AppError {
  constructor(message?: string) {
    super({
      name: 'UserAlreadyExistsError',
      message: message ?? 'User already exists',
      statusCode: StatusCodes.CONFLICT,
    });
  }
}
