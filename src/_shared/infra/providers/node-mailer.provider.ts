import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "~/_shared/application";

export class NodeMailerProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          service: process.env.SEND_MAIL_SERVICE,
          host: process.env.SEND_MAIL_HOST,
          port: Number(process.env.SEND_MAIL_PORT),
          secure: Boolean(process.env.SEND_MAIL_SECURE),
          auth: {
            user: process.env.SEND_MAIL_USER,
            pass: process.env.SEND_MAIL_PASS,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "mirantes <noreplay@mirantes.co.ao>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
  }
}
