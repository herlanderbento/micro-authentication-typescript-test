import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ChangePasswordUserUseCase } from "~/modules/account/application";
import { changePasswordUserValidated } from "./validator";

export class ChangePasswordUserController {
  constructor(
    private readonly changePasswordUserUseCase: ChangePasswordUserUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const input = await changePasswordUserValidated(request);

    const output = await this.changePasswordUserUseCase.execute(input);

    return response.status(StatusCodes.NO_CONTENT).json({
      data: output,
    });
  }
}
