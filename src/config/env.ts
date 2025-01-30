import { config } from "dotenv";

config();

export const envVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI as string,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN as string,
  MAIN_EMAIL: process.env.MAIN_EMAIL as string,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
};
