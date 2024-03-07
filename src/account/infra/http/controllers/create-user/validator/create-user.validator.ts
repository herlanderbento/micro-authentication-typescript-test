import { type Request } from "express";
import * as Yup from "yup";

export async function createUserValidated(request: Request) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "The name field must have at least 3 characters")
      .max(101, "The name field must have a maximum of 100 characters")
      .required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
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
