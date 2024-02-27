import { Document, Types } from 'mongoose';
import { UserProps } from '~/modules/account/domain';

export type IUserModelDocument = Document & { _id: Types.UUID } & UserProps;
