import { Request, Response } from "express";
import { googleSignUpOneTopValidated } from "./validator";
import { GoogleSignUpOneTopService } from "~/account/application";
import { StatusCodes } from "http-status-codes";

export class GoogleSignUpOneTopController {
  constructor(private googleSignUpOneTopService: GoogleSignUpOneTopService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const input = await googleSignUpOneTopValidated(request);

    const output = await this.googleSignUpOneTopService.execute(input);

    return response.status(StatusCodes.OK).json({
      data: output,
    });
  }
}
