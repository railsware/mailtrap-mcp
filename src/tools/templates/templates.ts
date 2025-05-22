import axios, { AxiosError, AxiosInstance } from "axios";

const { MAILTRAP_API_TOKEN, MAILTRAP_ACCOUNT_ID } = process.env;

if (!MAILTRAP_API_TOKEN) {
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}
if (!MAILTRAP_ACCOUNT_ID) {
  console.error("Error: MAILTRAP_ACCOUNT_ID environment variable is required");
  process.exit(1);
}

const api: AxiosInstance = axios.create({
  baseURL: `https://mailtrap.io/api/accounts/${MAILTRAP_ACCOUNT_ID}`,
  headers: {
    "Api-Token": MAILTRAP_API_TOKEN,
    "Content-Type": "application/json",
  },
});

export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  category?: string | null;
  body_text?: string | null;
  body_html?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTemplateRequest {
  name: string;
  subject: string;
  category?: string;
  text?: string;
  html?: string;
}

export interface UpdateTemplateRequest {
  name?: string;
  subject?: string;
  category?: string;
  text?: string;
  html?: string;
}

export async function getTemplates(): Promise<EmailTemplate[]> {
  try {
    const { data } = await api.get<EmailTemplate[]>("/email_templates");
    return data;
  } catch (err) {
    const message = (err as AxiosError).message;
    throw new Error(`Failed to list templates: ${message}`);
  }
}

export async function createTemplate(req: CreateTemplateRequest): Promise<EmailTemplate> {
  try {
    const body: Record<string, unknown> = { name: req.name, subject: req.subject };
    if (req.category) body.category = req.category;
    if (req.text) body.body_text = req.text;
    if (req.html) body.body_html = req.html;
    const { data } = await api.post<EmailTemplate>("/email_templates", body);
    return data;
  } catch (err) {
    const message = (err as AxiosError).message;
    throw new Error(`Failed to create template: ${message}`);
  }
}

export async function updateTemplate(id: number, req: UpdateTemplateRequest): Promise<EmailTemplate> {
  try {
    const body: Record<string, unknown> = {};
    if (req.name) body.name = req.name;
    if (req.subject) body.subject = req.subject;
    if (req.category) body.category = req.category;
    if (req.text) body.body_text = req.text;
    if (req.html) body.body_html = req.html;
    const { data } = await api.patch<EmailTemplate>(`/email_templates/${id}`, body);
    return data;
  } catch (err) {
    const message = (err as AxiosError).message;
    throw new Error(`Failed to update template: ${message}`);
  }
}

export async function deleteTemplate(id: number): Promise<void> {
  try {
    await api.delete(`/email_templates/${id}`);
  } catch (err) {
    const message = (err as AxiosError).message;
    throw new Error(`Failed to delete template: ${message}`);
  }
}

