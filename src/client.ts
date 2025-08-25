import { MailtrapClient } from "mailtrap";

const { MAILTRAP_API_TOKEN } = process.env;

if (!MAILTRAP_API_TOKEN) {
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}

const client = new MailtrapClient({
  token: MAILTRAP_API_TOKEN,
  // conditionally set accountId if it's a valid number
  ...(process.env.MAILTRAP_ACCOUNT_ID && !isNaN(Number(process.env.MAILTRAP_ACCOUNT_ID))
    ? { accountId: Number(process.env.MAILTRAP_ACCOUNT_ID) }
    : {}),
});

// eslint-disable-next-line import/prefer-default-export
export { client };
