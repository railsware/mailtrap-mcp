import apiClient from "../../apiClient";
import {
  ListEmailTemplatesRequest,
  CreateEmailTemplateRequest,
  UpdateEmailTemplateRequest,
  DeleteEmailTemplateRequest,
} from "../../types/templates";

export async function listEmailTemplates({ accountId }: ListEmailTemplatesRequest): Promise<{ content: any[]; isError?: boolean }> {
  try {
    const response = await apiClient.get(`/api/accounts/${accountId}/email_templates`);
    return {
      content: [{ type: "text", text: JSON.stringify(response.data) }],
    };
  } catch (error) {
    console.error("Error fetching templates:", error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Failed to fetch templates: ${message}` }],
      isError: true,
    };
  }
}

export async function createEmailTemplate({ accountId, name, subject, category, body_text, body_html, }: CreateEmailTemplateRequest): Promise<{ content: any[]; isError?: boolean }> {
  try {
    const response = await apiClient.post(`/api/accounts/${accountId}/email_templates`, {
      name,
      subject,
      category,
      body_text,
      body_html,
    });

    return {
      content: [{ type: "text", text: JSON.stringify(response.data) }],
    };
  } catch (error) {
    console.error("Error creating template:", error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Failed to create template: ${message}` }],
      isError: true,
    };
  }
}

export async function updateEmailTemplate({ accountId, emailTemplateId, name, subject, category, body_text, body_html, }: UpdateEmailTemplateRequest): Promise<{ content: any[]; isError?: boolean }> {
  try {
    const response = await apiClient.patch(`/api/accounts/${accountId}/email_templates/${emailTemplateId}`, {
      name,
      subject,
      category,
      body_text,
      body_html,
    });

    return {
      content: [{ type: "text", text: JSON.stringify(response.data) }],
    };
  } catch (error) {
    console.error("Error updating template:", error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Failed to update template: ${message}` }],
      isError: true,
    };
  }
}

export async function deleteEmailTemplate({ accountId, emailTemplateId }: DeleteEmailTemplateRequest): Promise<{ content: any[]; isError?: boolean }> {
  try {
    await apiClient.delete(`/api/accounts/${accountId}/email_templates/${emailTemplateId}`);
    return {
      content: [{ type: "text", text: "Template deleted successfully" }],
    };
  } catch (error) {
    console.error("Error deleting template:", error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Failed to delete template: ${message}` }],
      isError: true,
    };
  }
}
