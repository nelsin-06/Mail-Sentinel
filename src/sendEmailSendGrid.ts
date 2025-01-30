import { envVars } from "./config/env";
import sgMail from "@sendgrid/mail";
import logger from "./utils/logger";

export class SendEmailSendGrid {
  private SENDGRID_API_KEY: string = envVars.SENDGRID_API_KEY;
  private MAIN_EMAIL: string = envVars.MAIN_EMAIL;

  async sendEmail() {
    try {
      sgMail.setApiKey(this.SENDGRID_API_KEY);

      const msg = {
        to: "nelsoncg0611@gmail.com",
        from: this.MAIN_EMAIL,
        subject: "MENSAJE IMPORTANTE UYUY",
        text: "Some datos to login into my accounts",
      };

      return await sgMail.send(msg);
    } catch (error) {
      logger.error("PROCESS TO SEND AN EMAIL BY SENDGRID");
      logger.error(error);
    }
  }
}
