import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SendVerifyCodeUserUseCase } from "~/modules/account/application";
import { sendVerifyCodeUserValidated } from "./validator";

export class SendVerifyCodeUserController {
  constructor(private sendVerifyCodeUserUseCase: SendVerifyCodeUserUseCase) {}

  async handle(request: Request, response: Response) {
    const input = await sendVerifyCodeUserValidated(request);

    await this.sendVerifyCodeUserUseCase.execute(input);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}
