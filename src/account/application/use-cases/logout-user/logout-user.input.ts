export interface LogoutUserInput {
  token: any;
}

export interface LogoutUserDecrypt {
  sub: string;
  expiresIn: number;
  iat: number;
}
