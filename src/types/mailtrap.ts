export interface SendMailToolRequest {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  cc?: string[];
  bcc?: string[];
  category: string;
}

export interface CreateTemplateRequest {
  name: string;
  subject: string;
  html?: string;
  text?: string;
  category?: string;
}

export interface UpdateTemplateRequest {
  template_id: number;
  name?: string;
  subject?: string;
  html?: string;
  text?: string;
  category?: string;
}

export interface DeleteTemplateRequest {
  template_id: number;
}
