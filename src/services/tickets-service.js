import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "./providers";
import mockTickets from '../mocks/tickets.json'
import normalizeTicket from "src/common/helpers/normalize-ticket";

const BASE_URL = "http://server/api/tickets";

class TicketsService extends HttpClient {
  async fetchTickets() {
    try {
      const tickets = await this.get("/");
      return tickets.map(ticket => normalizeTicket(ticket))
    } catch (e) {
      return mockTickets.map(ticket => normalizeTicket(ticket));
      throw Error(e);
    }
  }
}

export default new TicketsService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
