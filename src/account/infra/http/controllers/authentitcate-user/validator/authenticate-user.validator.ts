import { type Request } from "express";
import * as Yup from "yup";

export async function authenticateUserValidated(request: Request) {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    origin: Yup.string(),
    devices: Yup.string(),
  });

  return await schema.validate(
    {
      origin: request.headers.origin,
      devices: request.headers["devices"],

      ...request.body,
    },
    { abortEarly: false, stripUnknown: true }
  );
}
