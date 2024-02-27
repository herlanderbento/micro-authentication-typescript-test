export type AuthenticateUserInput = {
  email: string;
  password: string;
  origin?: string;
  devices?: string;
};
