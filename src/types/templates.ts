export interface EmailTemplate {
  id: number;
  name: string;
  uuid: string;
  category: string;
  subject: string;
  body_text?: string;
  body_html?: string;
  created_at: string;
  updated_at: string;
}

export interface ListEmailTemplatesRequest {
  accountId: number;
}

export interface CreateEmailTemplateRequest {
  accountId: number;
  name: string;
  subject: string;
  category: string;
  body_text?: string;
  body_html?: string;
}

export interface UpdateEmailTemplateRequest {
  accountId: number;
  emailTemplateId: number;
  name?: string;
  subject?: string;
  category?: string;
  body_text?: string;
  body_html?: string;
}

export interface DeleteEmailTemplateRequest {
  accountId: number;
  emailTemplateId: number;
}
