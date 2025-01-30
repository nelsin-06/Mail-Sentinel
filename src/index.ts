import { checkInactivity } from "./checkInActivity";
import { getLastActivity } from "./getLastActivity";
import { SendEmailNodemailer } from "./sendEmailNodemailer";
import { SendEmailSendGrid } from "./sendEmailSendGrid";
import cron from "node-cron";

(async () => {
  try {
    const sendEmail = new SendEmailNodemailer();
    const sendEmailSendGrid = new SendEmailSendGrid();
    await sendEmail.sendEmail();
    await sendEmailSendGrid.sendEmail();
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
})();

console.log("EMAIL SENTINEL STARTED");
