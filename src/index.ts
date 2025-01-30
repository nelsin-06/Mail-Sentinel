import { checkInactivity } from "./checkInActivity";
import { getLastActivity } from "./getLastActivity";
import { SendEmailNodemailer } from "./sendEmailNodemailer";
import { SendEmailSendGrid } from "./sendEmailSendGrid";
import cron from "node-cron";
import { config } from "dotenv";

config();

(async () => {
  try {
    // const sendEmail = new SendEmailNodemailer();
    const sendEmailSendGrid = new SendEmailSendGrid();
    // await sendEmail.sendEmail();
    await sendEmailSendGrid.sendEmail();
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
})();

// cron.schedule("*/1 * * * *", async () => {
//   console.log("paso por el cron job");
//   // Revisa cada 5 minutos
//   // const lastActivity = await getLastActivity();
//   // console.log("🚀 ~ cron.schedule ~ lastActivity:", lastActivity);
//   // (lastActivity && checkInactivity(lastActivity, 30))

//   if (true) {
//     try {
//       const sendEmail = new SendEmailNodemailer();
//       await sendEmail.sendEmail();
//       // await sendNotificationEmailSendGrid();
//     } catch (error) {
//       console.log("🚀 ~ cron.schedule ~ error from sendgrid:", error);
//     }

//     // try {
//     //   await sendMailNodemailer();
//     // } catch (error) {
//     //   console.log("🚀 ~ cron.schedule ~ error from nodemailer:", error);
//     // }
//   }
// });
console.log("se ejecuto el script");
