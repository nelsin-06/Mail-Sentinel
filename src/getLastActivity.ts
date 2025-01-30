import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

export async function getLastActivity() {
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 1, // Obtiene el último correo
  });
  const lastMessage = res.data.messages[0];
  if (lastMessage) {
    const message = await gmail.users.messages.get({
      userId: "me",
      id: lastMessage.id,
    });
    const date = new Date(parseInt(message.data.internalDate));
    console.log(`Última interacción: ${date}`);
    return date;
  }
  return null;
}
