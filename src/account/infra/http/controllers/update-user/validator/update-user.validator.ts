import { type Request } from "express";


import * as Yup from "yup";

export async function updateUserValidated(request: Request) {
  const schema = Yup.object().shape({
    id: Yup.string().uuid().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
  });

  return await schema.validate(
    {
      id: request.params.id,
      ...request.body,
    },
    { abortEarly: false, stripUnknown: true }
  );
}
