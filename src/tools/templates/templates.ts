import axios from "axios";

const { MAILTRAP_API_TOKEN, MAILTRAP_ACCOUNT_ID } = process.env;

if (!MAILTRAP_API_TOKEN) {
  console.error("Error: MAILTRAP_API_TOKEN environment variable is required");
  process.exit(1);
}
if (!MAILTRAP_ACCOUNT_ID) {
  console.error("Error: MAILTRAP_ACCOUNT_ID environment variable is required");
  process.exit(1);
}

const api = axios.create({
  baseURL: `https://mailtrap.io/api/accounts/${MAILTRAP_ACCOUNT_ID}`,
  headers: {
    "Api-Token": MAILTRAP_API_TOKEN,
    "Content-Type": "application/json",
  },
});

export async function getTemplates() {
  const { data } = await api.get("/email_templates");
  return data;
}

export async function createTemplate(template: {
  name: string;
  subject: string;
  category?: string;
  text?: string;
  html?: string;
}) {
  const body: any = {
    name: template.name,
    subject: template.subject,
  };
  if (template.category) body.category = template.category;
  if (template.text) body.body_text = template.text;
  if (template.html) body.body_html = template.html;
  const { data } = await api.post("/email_templates", body);
  return data;
}

export async function updateTemplate(id: number, template: {
  name?: string;
  subject?: string;
  category?: string;
  text?: string;
  html?: string;
}) {
  const body: any = {};
  if (template.name) body.name = template.name;
  if (template.subject) body.subject = template.subject;
  if (template.category) body.category = template.category;
  if (template.text) body.body_text = template.text;
  if (template.html) body.body_html = template.html;
  const { data } = await api.patch(`/email_templates/${id}`, body);
  return data;
}

export async function deleteTemplate(id: number) {
  await api.delete(`/email_templates/${id}`);
}

