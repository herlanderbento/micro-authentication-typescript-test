import { type Request } from "express";
import * as Yup from "yup";

export async function sendVerifyCodeUserValidated(request: Request) {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  return await schema.validate(request.body);
}
