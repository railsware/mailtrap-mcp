import { z } from "zod";

const deleteTemplateSchema = {
  template_id: z.number().describe("ID of the template to delete"),
};

export default deleteTemplateSchema;
