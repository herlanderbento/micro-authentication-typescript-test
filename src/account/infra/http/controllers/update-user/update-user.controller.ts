import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserUseCase } from '~/account/application';
import { updateUserValidated } from './validator';


export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = await updateUserValidated(request);

    const output = await this.updateUserUseCase.execute(input);

    return response.status(StatusCodes.OK).json({ data: output });
  }
}
