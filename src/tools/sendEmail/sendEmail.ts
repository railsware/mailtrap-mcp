import { Address, Mail } from "mailtrap";
import { SendMailToolRequest } from "../../types/mailtrap";

import { client } from "../../client";

const { DEFAULT_FROM_EMAIL } = process.env;

async function sendEmail({
  from,
  to,
  subject,
  text,
  cc,
  bcc,
  category,
  html,
}: SendMailToolRequest): Promise<{ content: any[]; isError?: boolean }> {
  try {
    if (!html && !text) {
      throw new Error("Either HTML or TEXT body is required");
    }

    const fromEmail = from ?? DEFAULT_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "No 'from' email provided and no 'DEFAULT_FROM_EMAIL' email set"
      );
    }

    const fromAddress: Address = {
      email: fromEmail,
    };

    const toAddress: Address = {
      email: to,
    };

    const emailData: Mail = {
      from: fromAddress,
      to: [toAddress],
      subject,
      text,
      html,
      category,
    };

    if (cc && cc.length > 0) emailData.cc = cc.map((email) => ({ email }));
    if (bcc && bcc.length > 0) emailData.bcc = bcc.map((email) => ({ email }));

    const response = await client.send(emailData);

    return {
      content: [
        {
          type: "text",
          text: `Email sent successfully to ${to}.\nMessage IDs: ${
            response.message_ids
          }\nStatus: ${response.success ? "Success" : "Failed"}`,
        },
      ],
    };
  } catch (error) {
    console.error("Error sending email:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      content: [
        {
          type: "text",
          text: `Failed to send email: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
}

export default sendEmail;
