import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthenticateUserUseCase } from "~/modules/account/application";
import { authenticateUserValidated } from "./validator";

export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const input = await authenticateUserValidated(request);

    const output = await this.authenticateUserUseCase.execute(input);

    return response.status(StatusCodes.OK).json({
      data: output,
    });
  }
}
