import { type Request } from "express";
import * as Yup from "yup";

export async function googleSignInOneTopValidated(request: Request) {
  const schema = Yup.object().shape({
    credential: Yup.string().required(),
    origin: Yup.string(),
  });

  return await schema.validate(request.body);
}
