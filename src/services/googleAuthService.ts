import { google } from "googleapis";
import { envVars } from "../config/env";

export class GoogleAuthService {
  private CLIENT_ID: string = envVars.GOOGLE_CLIENT_ID;
  private CLIENT_SECRET: string = envVars.GOOGLE_CLIENT_SECRET;
  private REDIRECT_URI: string = envVars.GOOGLE_REDIRECT_URI;
  private REFRESH_TOKEN: string = envVars.GOOGLE_REFRESH_TOKEN;

  // config client auth google
  private setCredentials() {
    const oAuth2Client = new google.auth.OAuth2(
      this.CLIENT_ID,
      this.CLIENT_SECRET,
      this.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });
    return oAuth2Client;
  }

  // get accessToken google
  async getAccessToken() {
    const oAuth2Client = this.setCredentials();
    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken;
  }
}
