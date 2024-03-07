import jwt from "jsonwebtoken";
import { IGeneratorToken } from "~/_shared/application/generator-token";

export class JwtEncrypter implements IGeneratorToken {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, String(process.env.JWT_SECRET), {
      expiresIn: "1h",
    });
  }

  async decrypt<JwtPayload>(payload: Record<string, any>): Promise<JwtPayload> {
    return Promise.resolve(
      jwt.verify(String(payload), String(process.env.JWT_SECRET)) as JwtPayload
    );
  }
}
