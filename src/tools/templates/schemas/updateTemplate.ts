import { z } from "zod";

const updateTemplateSchema = {
  template_id: z.number().describe("ID of the template to update"),
  name: z.string().optional().describe("New name for the template"),
  subject: z.string().optional().describe("New email subject line"),
  html: z.string().optional().describe("New HTML content of the template"),
  text: z
    .string()
    .optional()
    .describe("New plain text version of the template"),
  category: z.string().optional().describe("New category for the template"),
};

export default updateTemplateSchema;
