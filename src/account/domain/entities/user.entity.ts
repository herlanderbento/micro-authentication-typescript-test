import { AggregateRoot } from '~/_shared/domain/entities/aggregate-root';
import { EntityID } from '~/_shared/domain/value-object/entity-id.vo';
import { Optional, Slug } from '~/_shared/domain';
import { RolesEnum, StatusEnum } from '../enums';

export type UserProps = {
  name: string;
  slug: Slug;
  email: string;
  phone?: string;
  password: string;
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

  set name(name: string) {
    this.props.name = name;
    this.props.slug = Slug.createFromText(name);
  }

  get slug() {
    return this.props.slug;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get status() {
    return this.props.status;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get isPhoneVerified() {
    return this.props.isPhoneVerified;
  }

  get isEmailVerified() {
    return this.props.isEmailVerified;
  }

  get avatar() {
    return this.props.avatar;
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

  static create(
    props: Optional<UserProps, 'createdAt' | 'slug' | 'password'>,
    id?: EntityID
  ): User {
    const user = new User(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        status: props.status ?? StatusEnum.Pending,
        isEmailVerified: props.isEmailVerified ?? false,
        isPhoneVerified: props.isPhoneVerified ?? false,
        role: props.role ?? RolesEnum.User,
        password: props.password ?? 'password',
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
      slug: this.slug.value,
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
