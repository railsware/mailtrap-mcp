import { z } from "zod";

const sendSandboxEmailSchema = {
  from: z.string().email().describe("Email address of the sender"),
  to: z.string().min(1).describe("Email addresses (comma-separated or single)"),
  subject: z.string().describe("Email subject line"),
  cc: z.array(z.string().email()).optional().describe("Optional CC recipients"),
  bcc: z
    .array(z.string().email())
    .optional()
    .describe("Optional BCC recipients"),
  category: z
    .string()
    .optional()
    .describe("Optional email category for tracking"),
  text: z.string().optional().describe("Email body text"),
  html: z
    .string()
    .optional()
    .describe("Optional HTML version of the email body"),
};

export default sendSandboxEmailSchema;
