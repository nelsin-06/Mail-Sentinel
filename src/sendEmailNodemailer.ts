import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";
import { envVars } from "./config/env";
import logger from "./utils/logger";

export class SendEmailNodemailer {
  private CLIENT_ID: string = envVars.GOOGLE_CLIENT_ID;
  private CLIENT_SECRET: string = envVars.GOOGLE_CLIENT_SECRET;
  private REDIRECT_URI: string = envVars.GOOGLE_REDIRECT_URI;
  private REFRESH_TOKEN: string = envVars.GOOGLE_REFRESH_TOKEN;
  private MAIN_EMAIL: string = envVars.MAIN_EMAIL;

  setCredencials() {
    const oAuth2Client = new google.auth.OAuth2(
      this.CLIENT_ID,
      this.CLIENT_SECRET,
      this.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });

    return oAuth2Client;
  }

  async getAccessToken(oAuth2Client: any) {
    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken;
  }

  async sendMailNodemailer(accessToken: string) {
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
      const oAuth2Client = this.setCredencials();
      const accessToken = await this.getAccessToken(oAuth2Client);
      return await this.sendMailNodemailer(accessToken);
    } catch (error) {
      logger.error("PROCESS TO SEND AN EMAIL BY NODEMAILER");
      logger.error(error);
    }
  }
}
