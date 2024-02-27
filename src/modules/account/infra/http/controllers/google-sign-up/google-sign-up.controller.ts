import { Request, Response } from "express";
import { googleSignUpValidated } from "./validator";
import { GoogleSignUpService } from "~/modules/account/application";
import { StatusCodes } from "http-status-codes";

export class GoogleSignUpController {
  constructor(private googleSignUpService: GoogleSignUpService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const input = await googleSignUpValidated(request);

    const output = await this.googleSignUpService.execute(input);

    return response.status(StatusCodes.OK).json({
      data: output,
    });
  }
}
