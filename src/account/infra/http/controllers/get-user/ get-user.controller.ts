import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserUseCase } from "~/account/application";
import { getUserValidated } from "./validator/get-user.validator";

export class GetUserController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const input = await getUserValidated(request);

    const output = await this.getUserUseCase.execute(input);

    return response.status(StatusCodes.OK).json({
      data: output,
    });
  }
}