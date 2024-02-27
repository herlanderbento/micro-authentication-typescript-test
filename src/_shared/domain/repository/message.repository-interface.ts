export interface IMessageRepository {
  sendMessage(message: string): Promise<void>;
}
