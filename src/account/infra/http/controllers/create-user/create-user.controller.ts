import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUserValidated } from './validator/create-user.validator';
import { CreateUserUseCase } from '~/account/application/use-cases/create-user';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const input = await createUserValidated(request);

    const output = await this.createUserUseCase.execute(input);

    return response.status(StatusCodes.CREATED).json({
      data: output,
    });
  }
}
