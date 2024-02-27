import * as amqp from "amqplib";
import { IMessageRepository } from "~/_shared/domain";

export class RabbitMQServices implements IMessageRepository {
  private queue: string;

  constructor(queue: string) {
    this.queue = queue;
  }

  async sendMessage(message: string): Promise<void> {
    const connection = await amqp.connect(String(process.env.CLOUDAMQP_URL));
    const channel = await connection.createChannel();

    await channel.assertQueue(this.queue);
    channel.sendToQueue(this.queue, Buffer.from(message));

    console.log(`[x] Mensagem enviada: ${message}`);

    await channel.close();
    await connection.close();
  }
}
