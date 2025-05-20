import { z } from "zod";

export const createTemplateSchema = {
  name: z.string().describe("Template name"),
  subject: z.string().describe("Email subject"),
  category: z.string().optional().describe("Template category"),
  text: z.string().optional().describe("Text body"),
  html: z.string().optional().describe("HTML body"),
};

export const updateTemplateSchema = {
  id: z.number().describe("Template ID"),
  name: z.string().optional().describe("Template name"),
  subject: z.string().optional().describe("Email subject"),
  category: z.string().optional().describe("Template category"),
  text: z.string().optional().describe("Text body"),
  html: z.string().optional().describe("HTML body"),
};

export const deleteTemplateSchema = {
  id: z.number().describe("Template ID"),
};

