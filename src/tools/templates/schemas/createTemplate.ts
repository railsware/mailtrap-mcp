import { z } from "zod";

const createTemplateSchema = {
  name: z.string().describe("Name of the template"),
  subject: z.string().describe("Email subject line"),
  html: z
    .string()
    .optional()
    .describe("HTML content of the template (optional)"),
  text: z
    .string()
    .optional()
    .describe("Plain text version of the template (optional)"),
  category: z
    .string()
    .optional()
    .describe("Template category (optional, defaults to 'General')"),
};

export default createTemplateSchema;
