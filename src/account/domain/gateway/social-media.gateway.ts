export interface ISocialMediaGateway {
  findGoogleAccessTokenByToken(googleToken: string): Promise<any>;
  findLinkedinAccessTokenByToken(linkedinToken: string): Promise<any>;
  findLinkedinAccessTokenByPayload(redirectUri: string, code: string): Promise<any>;
}
