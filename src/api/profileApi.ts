import { api, MOCK_MODE, wait } from "./client";
import { MOCK_PROFILE } from "./mockData";
import type { Profile } from "@/types";

let cached: Profile = { ...MOCK_PROFILE };

export const profileApi = {
  async get(): Promise<Profile> {
    if (MOCK_MODE) {
      await wait(200);
      return cached;
    }
    return (await api.get("/profile")).data;
  },
  async update(patch: Partial<Profile>): Promise<Profile> {
    if (MOCK_MODE) {
      await wait(300);
      cached = { ...cached, ...patch };
      return cached;
    }
    return (await api.patch("/profile", patch)).data;
  },
  async uploadResume(file: File): Promise<Profile["resumeLink"]> {
    if (MOCK_MODE) {
      await wait(700);
      cached.resumeLink = file.name;
      return cached.resumeLink;
    }
    const fd = new FormData();
    fd.append("file", file);
    return (
      await api.post("/profile/resume", fd, { headers: { "Content-Type": "multipart/form-data" } })
    ).data;
  },
  async deleteResume(): Promise<void> {
    if (MOCK_MODE) {
      await wait(200);
      cached.resumeLink = "";
      return;
    }
    await api.delete("/profile/resume");
  },
};
