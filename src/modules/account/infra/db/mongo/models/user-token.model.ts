import { STATES, Schema, model } from "mongoose";
import { UserModel } from "./user.model";
import { IUserTokenModelDocument } from "../mappers";

export const UserTokenModel = model<IUserTokenModelDocument>(
  "UserTokens",
  new Schema({
    _id: String,
    userId: {
      type: String,
      required: true,
      ref: UserModel,
    },
    accessToken: String,
    refreshToken: String,
    expireDate: Date,
    origin: String,
    devices: String,
    createdAt: Date,
  })
);
