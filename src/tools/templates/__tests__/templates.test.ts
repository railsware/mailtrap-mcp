import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const apiInstance = { get: jest.fn(), post: jest.fn(), patch: jest.fn(), delete: jest.fn() } as const;
(mockedAxios.create as jest.Mock).mockReturnValue(apiInstance);

import { getTemplates, createTemplate, updateTemplate, deleteTemplate } from "../templates";

describe("templates tools", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get templates", async () => {
    apiInstance.get.mockResolvedValue({ data: [{ id: 1 }] });
    const res = await getTemplates();
    expect(apiInstance.get).toHaveBeenCalledWith("/email_templates");
    expect(res).toEqual([{ id: 1 }]);
  });

  it("should create template", async () => {
    apiInstance.post.mockResolvedValue({ data: { id: 2 } });
    const res = await createTemplate({ name: "Template", subject: "Subject" });
    expect(apiInstance.post).toHaveBeenCalledWith("/email_templates", { name: "Template", subject: "Subject" });
    expect(res).toEqual({ id: 2 });
  });

  it("should update template", async () => {
    apiInstance.patch.mockResolvedValue({ data: { id: 3 } });
    const res = await updateTemplate(3, { name: "Updated" });
    expect(apiInstance.patch).toHaveBeenCalledWith("/email_templates/3", { name: "Updated" });
    expect(res).toEqual({ id: 3 });
  });

  it("should delete template", async () => {
    apiInstance.delete.mockResolvedValue({});
    await deleteTemplate(4);
    expect(apiInstance.delete).toHaveBeenCalledWith("/email_templates/4");
  });
});

