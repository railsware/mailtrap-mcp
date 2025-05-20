import { z } from "zod";

const accountId = z.number().describe("Unique account ID");
const templateId = z.number().describe("Unique email template ID");

export const listEmailTemplatesSchema = {
  accountId,
};

export const createEmailTemplateSchema = {
  accountId,
  name: z.string().describe("Template name"),
  subject: z.string().describe("Template subject"),
  category: z.string().describe("Template category"),
  body_text: z.string().optional().describe("Text body"),
  body_html: z.string().optional().describe("HTML body"),
};

export const updateEmailTemplateSchema = {
  accountId,
  emailTemplateId: templateId,
  name: z.string().optional().describe("Template name"),
  subject: z.string().optional().describe("Template subject"),
  category: z.string().optional().describe("Template category"),
  body_text: z.string().optional().describe("Text body"),
  body_html: z.string().optional().describe("HTML body"),
};

export const deleteEmailTemplateSchema = {
  accountId,
  emailTemplateId: templateId,
};
