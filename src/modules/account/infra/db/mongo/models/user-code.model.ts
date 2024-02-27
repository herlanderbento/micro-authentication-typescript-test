import { Schema, model } from "mongoose";
import { UserModel } from "./user.model";
import { IUserCodeModelDocument } from "../mappers/user-code-model.mapper";

export const UserCodeModel = model<IUserCodeModelDocument>(
  "UserCodes",
  new Schema({
    _id: String,
    userId: {
      type: String,
      required: true,
      ref: UserModel,
    },
    code: {
      type: String,
    },
    expireDate: Date,
    createdAt: Date,
  })
);
