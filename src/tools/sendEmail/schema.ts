import { z } from "zod";

const hasDefaultFromEmail = !!process.env.DEFAULT_FROM_EMAIL;

const sendEmailSchema = {
  from: hasDefaultFromEmail
    ? z
        .string()
        .email()
        .optional()
        .describe("Email address of the sender (optional with default)")
    : z.string().email().describe("Email address of the sender"),
  to: z
    .union([z.string().email(), z.array(z.string().email())])
    .describe(
      "Email address(es) of the recipient(s) - can be a single email or array of emails"
    ),
  subject: z.string().describe("Email subject line"),
  cc: z.array(z.string().email()).optional().describe("Optional CC recipients"),
  bcc: z
    .array(z.string().email())
    .optional()
    .describe("Optional BCC recipients"),
  category: z.string().describe("Email category for tracking"),
  text: z.string().optional().describe("Email body text"),
  html: z
    .string()
    .optional()
    .describe("Optional HTML version of the email body"),
};

export default sendEmailSchema;
