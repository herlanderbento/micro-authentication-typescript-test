import { type Request } from "express";
import * as Yup from "yup";

export async function changePasswordUserValidated(request: Request) {
  const schema = Yup.object().shape({
    id: Yup.string().uuid().required(),
    oldPassword: Yup.string().required(),
    password: Yup.string().required(),
  });

  return await schema.validate(
    {
      id: request.params.id,
      ...request.body,
    },
    { abortEarly: false, stripUnknown: true }
  );
}
