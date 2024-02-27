import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {
  UserModel,
  UserMongoRepository,
  UserTokenModel,
  UserTokenMongoRepository,
} from "../../db";
import { UserNotFoundError } from "~/modules/account/application";
import { InvalidTokenError } from "~/_shared/domain";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userTokenRepository = new UserTokenMongoRepository(UserTokenModel);

  const token = request.headers["x-access-token"];

  if (!token) {
    throw new InvalidTokenError("Token missing");
  }

  const userToken = await userTokenRepository.findByToken(token.toString());

  if (!userToken) {
    throw new InvalidTokenError("invalid token error");
  }

  try {
    const decodedToken = verify(
      token.toString(),
      String(process.env.JWT_SECRET)
    ) as IPayload;

    let userId;

    if (typeof decodedToken.sub === "string") {
      userId = decodedToken.sub;
    }

    //@ts-ignore
    if (typeof decodedToken.sub === "object" && decodedToken.sub.value) {
      //@ts-ignore
      userId = decodedToken.sub.value;
    }

    const usersRepository = new UserMongoRepository(UserModel);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError("User does not exists");
    }

    request.user = {
      id: userId,
      token: token.toString(),
    };

    next();
  } catch (err) {
    throw new InvalidTokenError();
  }
}
