import { envVars } from "./config/env";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

// Configura el cliente OAuth2
const oauth2Client = new OAuth2(
  envVars.GOOGLE_CLIENT_ID,
  envVars.GOOGLE_CLIENT_SECRET,
  envVars.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: envVars.GOOGLE_REFRESH_TOKEN });

// Configura la API de Gmail
const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// Función para obtener la fecha del último mensaje recibido
export async function getLastActivity() {
  try {
    // Obtiene la lista de mensajes

    const data = await gmail.users.getProfile({
      userId: "me",
    });
    console.log("🚀 ~ getLastActivity ~ data:", data);

    async function countReadMessages() {
      try {
        // Obtiene la lista de mensajes leídos
        const res = await gmail.users.messages.list({
          userId: "me",
          q: "is:read", // Filtra solo los mensajes leídos
        });

        // Obtiene el número de mensajes leídos
        const readCount = res.data.resultSizeEstimate;
        console.log("🚀 ~ countReadMessages ~ res.data:", res.data);
        console.log(`Número de mensajes leídos: ${readCount}`);
        return readCount;
      } catch (error) {
        console.error("Error al contar mensajes leídos:", error);
        throw error;
      }
    }

    // Ejemplo de uso
    countReadMessages()
      .then((count) => {
        console.log(`Tienes ${count} mensajes leídos.`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // const res = await gmail.users.messages.list({
    //   userId: "me",
    //   maxResults: 1, // Obtiene el último correo
    //   q: "in:inbox", // Filtra solo los mensajes en la bandeja de entrada
    // });

    // // Verifica si hay mensajes
    // if (!res.data.messages || res.data.messages.length === 0) {
    //   console.log("No hay mensajes en la bandeja de entrada.");
    //   return null;
    // }

    // // Obtiene el último mensaje
    // const lastMessage = res.data.messages[0];
    // const message = await gmail.users.messages.get({
    //   userId: "me",
    //   id: lastMessage.id,
    // });

    // // Obtiene la fecha del mensaje
    // const date = new Date(Number(message.data.internalDate));
    // console.log(`Última interacción: ${date}`);
    // return date;
    return null;
  } catch (error) {
    console.error("Error al obtener la última actividad:", error);
    throw error;
  }
}

// Ejemplo de uso
getLastActivity()
  .then((date) => {
    if (date) {
      console.log("Fecha del último mensaje:", date);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
