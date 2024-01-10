import { defineStore } from 'pinia'
import { profileService } from 'src/services'

export const useProfileStore = defineStore('profile', {
	state: () => ({
    userData: null,
	}),
	getters: {
	},
	actions: {
		setUserData(userData) {
			this.userData = userData;
		},
    async updateUserData(userData) {
			try {
				await profileService.updateUserData(userData);
				this.setUserData(userData);
				return 'ok'
			} catch (e) {
				return e.message
			}
    },
		async getUserById(userId) {
			try {
				const userData = await profileService.getUserById(userId);

				if (userData) {
					this.setUserData(userData);
					return 'ok';
				}

				return 'not-found'
			} catch (e) {
				return e.message
			}
		}
	},
})
