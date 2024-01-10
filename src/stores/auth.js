import { defineStore } from 'pinia'
import { authService } from 'src/services'
import { setToken, removeToken, getToken } from 'src/services/token-manager'
import { useProfileStore } from './profile'
import { useRoute, useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
	state: () => ({
    user: null
	}),
	getters: {
		isAuthenticated: state => !!state.user,
		getUserAttribute: state => attr => state.user ? state.user[attr] : ''
	},
	actions: {
		async login(login, password) {
			try {
				const data = await authService.login(login, password)
				setToken(data.token)
				return 'ok'
			} catch (e) {
				return e.message
			}
 		},
		async getMe() {
			const profileStore = useProfileStore();
			const userData = await authService.whoAmI();
      this.user = userData;
			profileStore.setUserData(userData);
		},
		async logout(sendRequest = true) {
			await authService.logout()
			this.user = null
			removeToken()
		},
		async checkUser() {
			const route = useRoute();
			const router = useRouter();
			const token = getToken();
			if (token) {
				try {
					await this.getMe();
					const { redirect } = route.query;
    			await router.push(redirect ? redirect : { name: "Home" });
				} catch (e) {
					removeToken();
					console.error(e);
				}
			}
		}
	},
})
