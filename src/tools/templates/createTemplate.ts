import { CreateTemplateRequest } from "../../types/mailtrap";
import { client } from "../../client";

async function createTemplate({
  name,
  subject,
  html,
  text,
  category,
}: CreateTemplateRequest): Promise<{ content: any[]; isError?: boolean }> {
  try {
    const template = await client.templates.create({
      name,
      subject,
      category: category || "General",
      body_html: html,
      body_text: text,
    });

    return {
      content: [
        {
          type: "text",
          text: `Template "${name}" created successfully!\nTemplate ID: ${template.id}\nTemplate UUID: ${template.uuid}`,
        },
      ],
    };
  } catch (error) {
    console.error("Error creating template:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      content: [
        {
          type: "text",
          text: `Failed to create template: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
}

export default createTemplate;
