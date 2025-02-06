import nodemailer, { TransportOptions } from "nodemailer";
import { envVars } from "./config/env";
import logger from "./utils/logger";
import { GoogleAuthService } from "./services";

export class SendEmailNodemailer {
  private MAIN_EMAIL: string = envVars.MAIN_EMAIL;
  private CLIENT_ID: string = envVars.GOOGLE_CLIENT_ID;
  private CLIENT_SECRET: string = envVars.GOOGLE_CLIENT_SECRET;
  private REFRESH_TOKEN: string = envVars.GOOGLE_REFRESH_TOKEN;
  private googleAuthService: GoogleAuthService;

  constructor() {
    this.googleAuthService = new GoogleAuthService();
  }

  async sendMailNodemailer(accessToken: any) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: this.MAIN_EMAIL,
        clientId: this.CLIENT_ID,
        clientSecret: this.CLIENT_SECRET,
        refreshToken: this.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as TransportOptions);

    const mailOptions = {
      from: `NELSON GALLEGO <${this.MAIN_EMAIL}>`,
      to: "nelsongallego0611@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  }

  async sendEmail() {
    try {
      const accessToken = await this.googleAuthService.getAccessToken();

      return await this.sendMailNodemailer(accessToken);
    } catch (error) {
      logger.error("PROCESS TO SEND AN EMAIL BY NODEMAILER");
      logger.error(error);
    }
  }
}
