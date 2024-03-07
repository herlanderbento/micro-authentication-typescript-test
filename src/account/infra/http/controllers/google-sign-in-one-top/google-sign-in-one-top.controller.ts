import { Request, Response } from "express";
import { googleSignInOneTopValidated } from "./validator";
import { GoogleSignInOneTopService } from "~/account/application";
import { StatusCodes } from "http-status-codes";

export class GoogleSignInOneTopController {
  constructor(private googleSignInOneTopService: GoogleSignInOneTopService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const input = await googleSignInOneTopValidated(request);

    const output = await this.googleSignInOneTopService.execute(input);

    return response.status(StatusCodes.OK).json({
      data: output,
    });
  }
}
