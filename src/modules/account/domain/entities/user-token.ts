import { AggregateRoot, EntityID } from "~/_shared/domain";

export type UserTokenProps = {
  userId: EntityID;
  accessToken: string;
  refreshToken?: string;
  origin?: string;
  devices?: string;
  expireDate?: Date;
  createdAt?: Date;
};

export class UserToken extends AggregateRoot<UserTokenProps> {
  constructor(props: UserTokenProps, id?: EntityID) {
    super(props, id);
    this.props.refreshToken = props.refreshToken ?? this.accessToken;
    this.props.expireDate =
      props.expireDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: EntityID) {
    this.props.userId = value;
  }

  get accessToken() {
    return this.props.accessToken;
  }

  set accessToken(value: string) {
    this.props.accessToken = value;
  }

  get refreshToken() {
    return this.props.refreshToken;
  }

  get origin(): string | undefined {
    return this.props.origin;
  }

  set origin(value: string) {
    console.log("value", value);
    this.props.origin = value;
  }

  get devices(): string | undefined {
    return this.props.devices;
  }

  set devices(value: string) {
    this.props.devices = value;
  }

  get expireDate() {
    return this.props.expireDate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  toJSON() {
    return {
      id: this.id.toValue(),
      ...this.props,
    };
  }
}
