import { MailtrapClient } from "mailtrap";

const { MAILTRAP_API_TOKEN } = process.env;

if (!MAILTRAP_API_TOKEN) {
  // eslint-disable-next-line no-console
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}

const client = new MailtrapClient({
  token: MAILTRAP_API_TOKEN,
});

// eslint-disable-next-line import/prefer-default-export
export { client };
