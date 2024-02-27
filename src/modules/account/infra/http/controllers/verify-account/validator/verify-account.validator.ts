import { type Request } from "express";
import * as Yup from "yup";

export async function verifyAccountValidated(request: Request) {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    code: Yup.string().required(),
  });

  return await schema.validate(request.body);
}
