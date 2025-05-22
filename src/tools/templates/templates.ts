const { MAILTRAP_API_TOKEN, MAILTRAP_ACCOUNT_ID } = process.env;

if (!MAILTRAP_API_TOKEN) {
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}
if (!MAILTRAP_ACCOUNT_ID) {
  console.error("Error: MAILTRAP_ACCOUNT_ID environment variable is required");
  process.exit(1);
}

const API_TOKEN = MAILTRAP_API_TOKEN as string;
const ACCOUNT_ID = MAILTRAP_ACCOUNT_ID as string;

const BASE_URL = `https://mailtrap.io/api/accounts/${ACCOUNT_ID}`;

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Api-Token": API_TOKEN,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

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
    return await request<EmailTemplate[]>("/email_templates", {
      method: "GET",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to list templates: ${message}`);
  }
}

export async function createTemplate(
  req: CreateTemplateRequest
): Promise<EmailTemplate> {
  try {
    const body: Record<string, unknown> = {
      name: req.name,
      subject: req.subject,
    };
    if (req.category) body.category = req.category;
    if (req.text) body.body_text = req.text;
    if (req.html) body.body_html = req.html;
    return await request<EmailTemplate>("/email_templates", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to create template: ${message}`);
  }
}

export async function updateTemplate(
  id: number,
  req: UpdateTemplateRequest
): Promise<EmailTemplate> {
  try {
    const body: Record<string, unknown> = {};
    if (req.name) body.name = req.name;
    if (req.subject) body.subject = req.subject;
    if (req.category) body.category = req.category;
    if (req.text) body.body_text = req.text;
    if (req.html) body.body_html = req.html;
    return await request<EmailTemplate>(`/email_templates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to update template: ${message}`);
  }
}

export async function deleteTemplate(id: number): Promise<void> {
  try {
    await request(`/email_templates/${id}`, { method: "DELETE" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to delete template: ${message}`);
  }
}
