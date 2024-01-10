import { HttpClient } from "./HttpClient";
import { getToken } from "./token-manager";
import httpProvider from "./providers";
import normalizeUserData from "src/common/helpers/normalize-user-data";
import users from 'src/mocks/users.json';

const BASE_URL = "http://server/api/profile";

class ProfileService extends HttpClient {
	async getUserById(userId) {
		try {
			const userData = await this.get(`/${userId}`);
			return userData ? normalizeUserData(userData) : userData;
		} catch (e) {
			return users.find(user => user.id == userId) ? normalizeUserData(users.find(user => user.id == userId)) : null;
			throw Error(e)
		}
	}
  async updateUserData(userData) {
		try {
			await this.put(`/${userData.id}`, { data: userData })
			return normalizeUserData(userData);
		} catch (e) {
      return normalizeUserData(userData);
			throw Error(e)
		}
	}
}

export default new ProfileService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
