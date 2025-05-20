jest.mock("../../../apiClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

import {
  listEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "../templates";
import apiClient from "../../../apiClient";

describe("email templates tools", () => {
  const mockTemplate = { id: 1, name: "Temp", uuid: "u", category: "cat", subject: "sub" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should list templates", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: [mockTemplate] });

    const result = await listEmailTemplates({ accountId: 2 });

    expect(apiClient.get).toHaveBeenCalledWith(
      "/api/accounts/2/email_templates"
    );
    expect(result).toEqual({
      content: [{ type: "text", text: JSON.stringify([mockTemplate]) }],
    });
  });

  it("should create template", async () => {
    (apiClient.post as jest.Mock).mockResolvedValue({ data: mockTemplate });

    const result = await createEmailTemplate({
      accountId: 2,
      name: "Temp",
      subject: "sub",
      category: "cat",
    });

    expect(apiClient.post).toHaveBeenCalledWith(
      "/api/accounts/2/email_templates",
      {
        name: "Temp",
        subject: "sub",
        category: "cat",
        body_text: undefined,
        body_html: undefined,
      }
    );
    expect(result).toEqual({
      content: [{ type: "text", text: JSON.stringify(mockTemplate) }],
    });
  });

  it("should update template", async () => {
    (apiClient.patch as jest.Mock).mockResolvedValue({ data: mockTemplate });

    const result = await updateEmailTemplate({
      accountId: 2,
      emailTemplateId: 3,
      name: "Temp",
    });

    expect(apiClient.patch).toHaveBeenCalledWith(
      "/api/accounts/2/email_templates/3",
      {
        name: "Temp",
        subject: undefined,
        category: undefined,
        body_text: undefined,
        body_html: undefined,
      }
    );
    expect(result).toEqual({
      content: [{ type: "text", text: JSON.stringify(mockTemplate) }],
    });
  });

  it("should delete template", async () => {
    (apiClient.delete as jest.Mock).mockResolvedValue({});

    const result = await deleteEmailTemplate({
      accountId: 2,
      emailTemplateId: 3,
    });

    expect(apiClient.delete).toHaveBeenCalledWith(
      "/api/accounts/2/email_templates/3"
    );
    expect(result).toEqual({
      content: [{ type: "text", text: "Template deleted successfully" }],
    });
  });

  it("should handle errors", async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error("fail"));

    const result = await listEmailTemplates({ accountId: 2 });

    expect(result).toEqual({
      content: [{ type: "text", text: "Failed to fetch templates: fail" }],
      isError: true,
    });
  });
});
