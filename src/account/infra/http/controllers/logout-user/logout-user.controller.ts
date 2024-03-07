import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LogoutUserUseCase } from "~/account/application";

export class LogoutUserController {
  constructor(private logoutUserUseCase: LogoutUserUseCase) {}

  async handle(request: Request, response: Response) {
    await this.logoutUserUseCase.execute({
      token: request.user.token,
    });

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}
