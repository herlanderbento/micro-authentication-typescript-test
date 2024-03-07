import amqp from 'amqplib';
import { RabbitMQError } from '~/_shared/domain';
import { Queue } from '~/_shared/domain/repository/queue-interface';

export class RabbitMQAdapter implements Queue {
  constructor(private queueName: string) {
    this.queueName = queueName;
  }
  async on(callback: Function): Promise<void> {
    const connection = await amqp.connect(process.env.CLOUDAMQP_URL);

    if (!connection) {
      throw new RabbitMQError();
    }

    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName, { durable: true });

    channel.consume(this.queueName, async function (msg: any) {
      const input = JSON.parse(msg.content.toString());
      await callback(input);
      channel.ack(msg);
    });
  }

  async publish(data: any): Promise<void> {
    const connection = await amqp.connect(process.env.CLOUDAMQP_URL);

    if (!connection) {
      throw new RabbitMQError();
    }

    const channel = await connection.createChannel();

    await channel.assertQueue(this.queueName);
    channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)));
    await channel.close();
  }
}
