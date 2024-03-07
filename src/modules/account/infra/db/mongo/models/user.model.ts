import { Schema, model } from "mongoose";
import { IUserModelDocument } from "./user-model-document.interface";
import { RolesEnum, StatusEnum } from "~/modules/account/domain";

export const UserModel = model<IUserModelDocument>(
  "Users",
  new Schema({
    _id: String,
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: StatusEnum,
    },
    role: { type: String, enum: RolesEnum },
    isPhoneVerified: Boolean,
    isEmailVerified: Boolean,
    createdAt: Date,
    updatedAt: Date,
  })
);
