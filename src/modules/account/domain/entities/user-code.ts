import { AggregateRoot, EntityID } from "~/_shared/domain";

export type UserCodeProps = {
  userId: EntityID;
  code?: string;
  expireDate: Date;
  createdAt?: Date;
};

export class UserCode extends AggregateRoot<UserCodeProps> {
  constructor(props: UserCodeProps, id?: EntityID) {
    super(props, id);
    this.props.code = props.code ?? this.generator();
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: EntityID) {
    this.props.userId = value;
  }

  get code() {
    return this.props.code;
  }

  get expireDate() {
    return this.props.expireDate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  generator(): string {
    const code =
      Math.floor(Math.random() * (9 * Math.pow(10, 4))) + Math.pow(10, 4);
    return code.toString();
  }

  toJSON() {
    return {
      id: this.id.toString(),
      ...this.props,
    };
  }
}
