#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import CONFIG from "./config";

import { sendEmailSchema, sendEmail } from "./tools/sendEmail";
import {
  listEmailTemplatesSchema,
  createEmailTemplateSchema,
  updateEmailTemplateSchema,
  deleteEmailTemplateSchema,
  listEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "./tools/templates";

dotenv.config();

const server = new McpServer({
  name: CONFIG.MCP_SERVER_NAME,
  version: CONFIG.MCP_SERVER_VERSION,
});

server.tool(
  "send-email",
  "Send transactional email using Mailtrap",
  sendEmailSchema,
  sendEmail
);

server.tool(
  "list-email-templates",
  "List email templates for an account",
  listEmailTemplatesSchema,
  listEmailTemplates
);

server.tool(
  "create-email-template",
  "Create Email Template",
  createEmailTemplateSchema,
  createEmailTemplate
);

server.tool(
  "update-email-template",
  "Update Email Template",
  updateEmailTemplateSchema,
  updateEmailTemplate
);

server.tool(
  "delete-email-template",
  "Delete Email Template",
  deleteEmailTemplateSchema,
  deleteEmailTemplate
);

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
