import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import CONFIG from "./config";

import { sendEmailSchema, sendEmail } from "./tools/sendEmail";
import {
  createTemplate,
  createTemplateSchema,
  deleteTemplate,
  deleteTemplateSchema,
  listTemplates,
  listTemplatesSchema,
  updateTemplate,
  updateTemplateSchema,
} from "./tools/templates";
import { sendSandboxEmail, sendSandboxEmailSchema } from "./tools/sandbox";

export function createServer(): McpServer {
  const server = new McpServer({
    name: CONFIG.MCP_SERVER_NAME,
    version: CONFIG.MCP_SERVER_VERSION,
  });

  /**
   * Sending operations.
   */
  server.tool(
    "send-email",
    "Send transactional email using Mailtrap",
    sendEmailSchema,
    sendEmail
  );

  /**
   * Templates operations.
   */
  server.tool(
    "create-template",
    "Create a new email template",
    createTemplateSchema,
    createTemplate
  );
  server.tool(
    "list-templates",
    "List all email templates",
    listTemplatesSchema,
    listTemplates
  );
  server.tool(
    "update-template",
    "Update an existing email template",
    updateTemplateSchema,
    updateTemplate
  );
  server.tool(
    "delete-template",
    "Delete an existing email template",
    deleteTemplateSchema,
    deleteTemplate
  );

  /**
   * Sandbox operations.
   */
  server.tool(
    "send-sandbox-email",
    "Send email in sandbox mode to a test inbox",
    sendSandboxEmailSchema,
    sendSandboxEmail
  );

  return server;
}

export async function startServer(server: McpServer): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
