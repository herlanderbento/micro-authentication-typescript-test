import { Request, Response } from "express";
import { SendForgotPasswordUseCase } from "~/modules/account/application";
import { sendForgotPasswordValidated } from "./validator";
import { StatusCodes } from "http-status-codes";

export class SendForgotPasswordController {
  constructor(private sendForgotPasswordUseCase: SendForgotPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = await sendForgotPasswordValidated(request);

    await this.sendForgotPasswordUseCase.execute(input);

    return response.status(StatusCodes.NO_CONTENT);
  }
}
