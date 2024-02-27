import { Request, Response } from "express";
import { googleSignInValidated } from "./validator";
import { GoogleSignInService } from "~/modules/account/application";
import { StatusCodes } from "http-status-codes";

export class GoogleSignInController {
  constructor(private googleSignInService: GoogleSignInService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const input = await googleSignInValidated(request);

    const output = await this.googleSignInService.execute(input);

    return response.status(StatusCodes.OK).json({
      data: output,
    });
  }
}
