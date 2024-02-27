import { Request, Response } from "express";
import { linkedinSignInValidated } from "./validator";
import { LinkedinSignInService } from "~/modules/account/application";
import { StatusCodes } from "http-status-codes";

export class LinkedinSignInController {
  constructor(private linkedinSignInService: LinkedinSignInService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = await linkedinSignInValidated(request);

    const output = await this.linkedinSignInService.execute(input);

    return response.status(StatusCodes.CREATED).json({
      data: output,
    });
  }
}
