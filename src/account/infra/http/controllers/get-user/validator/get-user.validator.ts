import { type Request } from "express";
import * as Yup from "yup";

export async function getUserValidated(request: Request) {
  const schema = Yup.object().shape({
    slug: Yup.string().required(),
  });

  return await schema.validate(
    {
      slug: request.params.slug,
    },
    { abortEarly: false, stripUnknown: true }
  );
}
