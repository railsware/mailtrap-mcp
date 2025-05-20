#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import CONFIG from "./config";

import { sendEmailSchema, sendEmail } from "./tools/sendEmail";
import {
  createTemplateSchema,
  updateTemplateSchema,
  deleteTemplateSchema,
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
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

server.tool("get-email-templates", "Get all email templates", {}, async () => {
  const templates = await getTemplates();
  return {
    content: [{ type: "text", text: JSON.stringify(templates, null, 2) }],
  };
});

server.tool(
  "create-email-template",
  "Create a new email template",
  createTemplateSchema,
  async (args) => {
    const template = await createTemplate(args as any);
    return {
      content: [{ type: "text", text: JSON.stringify(template, null, 2) }],
    };
  }
);

server.tool(
  "update-email-template",
  "Update an email template",
  updateTemplateSchema,
  async (args) => {
    const { id, ...rest } = args as any;
    const template = await updateTemplate(id, rest as any);
    return {
      content: [{ type: "text", text: JSON.stringify(template, null, 2) }],
    };
  }
);

server.tool(
  "delete-email-template",
  "Delete an email template",
  deleteTemplateSchema,
  async ({ id }: any) => {
    await deleteTemplate(id);
    return { content: [{ type: "text", text: "Deleted" }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
