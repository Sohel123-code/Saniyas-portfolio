import { createChatService } from "../../server/chat.js";

const chat = createChatService();
export const handler = async (event) => {
  const response = await chat({
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "",
    ip: event.headers["x-nf-client-connection-ip"] || "unknown",
  });
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: await response.text(),
  };
};
