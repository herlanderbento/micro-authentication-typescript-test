import { Request, Response } from "express";
import { linkedinSignUpValidated } from "./validator";
import { LinkedinSignUpService } from "~/modules/account/application";
import { StatusCodes } from "http-status-codes";

export class LinkedinSignUpController {
  constructor(private linkedinSignUpService: LinkedinSignUpService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = await linkedinSignUpValidated(request);

    const output = await this.linkedinSignUpService.execute(input);

    return response.status(StatusCodes.CREATED).json({
      data: output,
    });
  }
}
