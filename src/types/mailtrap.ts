export interface SendMailToolRequest {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  cc?: string[];
  bcc?: string[];
  category?: string;
}
