export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  origin?: string;
  devices?: string;
}
