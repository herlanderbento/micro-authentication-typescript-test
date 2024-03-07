import { type Request } from "express";
import * as Yup from "yup";

export async function linkedinSignInValidated(request: Request) {
  const schema = Yup.object().shape({
    code: Yup.string().required(),
    redirectUri: Yup.string().required(),
    origin: Yup.string(),
  });

  return await schema.validate(
    {
      origin: request.headers.origin,

      ...request.body,
    },
    { abortEarly: false, stripUnknown: true }
  );
}
