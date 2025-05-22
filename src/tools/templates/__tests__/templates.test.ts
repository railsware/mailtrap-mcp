import {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from "../templates";

describe("templates tools", () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = fetchMock;
  });

  it("should get templates", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [{ id: 1 }],
    });
    const res = await getTemplates();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://mailtrap.io/api/accounts/123/email_templates",
      expect.objectContaining({ method: "GET" })
    );
    expect(res).toEqual([{ id: 1 }]);
  });

  it("should create template", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 2 }),
    });
    const res = await createTemplate({ name: "Template", subject: "Subject" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://mailtrap.io/api/accounts/123/email_templates",
      expect.objectContaining({ method: "POST" })
    );
    expect(res).toEqual({ id: 2 });
  });

  it("should update template", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 3 }),
    });
    const res = await updateTemplate(3, { name: "Updated" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://mailtrap.io/api/accounts/123/email_templates/3",
      expect.objectContaining({ method: "PATCH" })
    );
    expect(res).toEqual({ id: 3 });
  });

  it("should delete template", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 204,
      text: async () => "",
    });
    await deleteTemplate(4);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://mailtrap.io/api/accounts/123/email_templates/4",
      expect.objectContaining({ method: "DELETE" })
    );
  });
});
