import { type Request } from "express";
import * as Yup from "yup";

export async function resetPasswordUserValidated(request: Request) {
  const schema = Yup.object().shape({
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string().when(
      "password",
      (password: string, field: any) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
    ),
  });

  return await schema.validate(
    {
      token: request.query,
      ...request.body,
    },
    { abortEarly: false, stripUnknown: true }
  );
}
