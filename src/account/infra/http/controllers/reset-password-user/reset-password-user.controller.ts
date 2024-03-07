import { Request, Response } from "express";
import { resetPasswordUserValidated } from "./validator";
import { ResetPasswordUserUseCase } from "~/account/application";
import { StatusCodes } from "http-status-codes";

export class ResetPasswordUserController {
  constructor(private resetPasswordUserUseCase: ResetPasswordUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = await resetPasswordUserValidated(request);

    await this.resetPasswordUserUseCase.execute({
      token: String(token),
      password,
    });

    return response.status(StatusCodes.OK).send();
  }
}
