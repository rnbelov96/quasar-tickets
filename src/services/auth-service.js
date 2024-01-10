import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "./providers";
import users from 'src/mocks/users.json';
import normalizeUserData from "src/common/helpers/normalize-user-data";

const BASE_URL = "http://server/api/tickets/api";

class AuthService extends HttpClient {
  async login(login, password) {
    try {
      return await this.post("/login", {
        data: {
          login,
          password,
        },
      });
    } catch (e) {
      if (login.trim() === 'admin' && password.trim() === 'admin') {
        return {
          token: 'token'
        };
      } else {
        throw Error('Неверный логин или пароль');
      }
      
      throw Error(e);
    }
  }
  async whoAmI() {
    try {
      const userData = await this.get("/whoAmI");
      return normalizeUserData(userData)
    } catch (e) {
      return normalizeUserData(users[0]);
      throw Error(e);
    }
  }
  async logout() {
    try {
      await this.delete("/logout");
    } catch (e) {
      return;
      throw Error(e);
    }
  }
}

export default new AuthService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
