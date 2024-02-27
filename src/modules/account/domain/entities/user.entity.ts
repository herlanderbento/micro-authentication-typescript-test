import { AggregateRoot } from "~/_shared/domain/entities/aggregate-root";
import { EntityID } from "~/_shared/domain/value-object/entity-id.vo";
import { Optional } from "~/_shared/domain";
import { RolesEnum, StatusEnum } from "../enums";

export type UserProps = {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  avatar?: string;
  status?: StatusEnum;
  role?: RolesEnum;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export class User extends AggregateRoot<UserProps> {
  constructor(props: UserProps, id?: EntityID) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value ?? null;
  }

  get status(): StatusEnum | undefined {
    return this.props.status;
  }

  set status(value: StatusEnum) {
    this.props.status = value ?? StatusEnum.Pending;
  }

  get password(): string | undefined {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value ?? null;
  }

  get isPhoneVerified(): boolean | undefined {
    return this.props.isPhoneVerified;
  }

  set isPhoneVerified(value: boolean) {
    this.props.isPhoneVerified = value ?? false;
  }

  get isEmailVerified(): boolean | undefined {
    return this.props.isEmailVerified;
  }

  set isEmailVerified(value: boolean) {
    this.props.isEmailVerified = value ?? false;
  }

  get avatar(): string | undefined {
    return this.props.avatar;
  }

  set avatar(value: string) {
    this.props.avatar = value ?? null;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<UserProps, "createdAt">, id?: EntityID): User {
    const user = new User(
      {
        ...props,
        status: props.status ?? StatusEnum.Pending,
        isEmailVerified: props.isEmailVerified ?? false,
        isPhoneVerified: props.isPhoneVerified ?? false,
        role: props.role ?? RolesEnum.User,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    return user;
  }

  update(props: Partial<UserProps>): void {
    Object.assign(this.props, { ...props, updatedAt: new Date() });
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      phone: this.phone,
      status: this.status,
      isPhoneVerified: this.isPhoneVerified,
      isEmailVerified: this.isEmailVerified,
      avatar: this.avatar,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
