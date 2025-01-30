import { envVars } from "./config/env";
import sgMail from "@sendgrid/mail";

export class SendEmailSendGrid {
  private SENDGRID_API_KEY: string = envVars.SENDGRID_API_KEY;
  private MAIN_EMAIL: string = envVars.MAIN_EMAIL;

  async sendEmail() {
    sgMail.setApiKey(this.SENDGRID_API_KEY);

    const msg = {
      to: "nelsoncg0611@gmail.com",
      from: this.MAIN_EMAIL,
      subject: "MENSAJE IMPORTANTE UYUY",
      text: "Some datos to login into my accounts",
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    return await sgMail.send(msg);
  }
}

export const sendNotificationEmailSendGrid = async () => {
  sgMail.setApiKey(envVars.SENDGRID_API_KEY);

  const msg = {
    to: "nelsoncg0611@gmail.com", // Change to your recipient
    from: "nelsongg2001@gmail.com", // Change to your verified sender
    subject: "MENSAJE IMPORTANTE UYUY",
    text: "Some datos to login into my accounts",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  return await sgMail.send(msg);
  // .then((data) => {
  //   console.log("Email sent");
  //   console.log(data);
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
};

(async () => {
  await sendNotificationEmailSendGrid();
})();
