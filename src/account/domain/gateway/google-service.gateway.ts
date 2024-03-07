export interface IGoogleServiceGateway {
  findByToken(token: string): Promise<any>;
}

