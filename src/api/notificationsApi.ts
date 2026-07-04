import { api, MOCK_MODE, wait } from "./client";
import { MOCK_NOTIFICATIONS } from "./mockData";
import type { NotificationItem } from "@/types";

let cached: NotificationItem[] = [...MOCK_NOTIFICATIONS];

export const notificationsApi = {
  async list(): Promise<NotificationItem[]> {
    if (MOCK_MODE) {
      await wait(200);
      return cached;
    }
    return (await api.get("/notifications")).data;
  },
  async markRead(id: string): Promise<void> {
    if (MOCK_MODE) {
      await wait(100);
      cached = cached.map((n) => (n.id === id ? { ...n, read: true } : n));
      return;
    }
    await api.post(`/notifications/${id}/read`);
  },
  async markAllRead(): Promise<void> {
    if (MOCK_MODE) {
      await wait(150);
      cached = cached.map((n) => ({ ...n, read: true }));
      return;
    }
    await api.post(`/notifications/read-all`);
  },
};
