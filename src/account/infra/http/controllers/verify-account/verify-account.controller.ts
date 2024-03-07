import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { VerifyAccountUseCase } from "~/account/application";
import { verifyAccountValidated } from "./validator";

export class VerifyAccountController {
  constructor(private verifyAccountUseCase: VerifyAccountUseCase) {}

  async handle(request: Request, response: Response) {
    const input = await verifyAccountValidated(request);

    await this.verifyAccountUseCase.execute(input);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}
