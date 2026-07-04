import { api, MOCK_MODE, wait } from "./client";
import { MOCK_OFFERS } from "./mockData";
import type { Offer } from "@/types";

let cached: Offer[] = [...MOCK_OFFERS];

export const offersApi = {
  async list(): Promise<Offer[]> {
    if (MOCK_MODE) {
      await wait(250);
      return cached;
    }
    return (await api.get("/offers")).data;
  },
  async respond(id: string, action: "accept" | "decline"): Promise<Offer> {
    if (MOCK_MODE) {
      await wait(400);
      cached = cached.map((o) =>
        o.id === id ? { ...o, status: action === "accept" ? "Accepted" : "Declined" } : o,
      );
      return cached.find((o) => o.id === id)!;
    }
    return (await api.post(`/offers/${id}/${action}`)).data;
  },
};
