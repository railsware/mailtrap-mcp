import { MailtrapClient } from "mailtrap";

const MAILTRAP_API_TOKEN = process.env.MAILTRAP_API_TOKEN;

if (!MAILTRAP_API_TOKEN) {
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}

const client = new MailtrapClient({
  token: MAILTRAP_API_TOKEN,
});

export { client };
