import { useAuthStore } from 'src/stores/auth'

export default async function isAdmin() {
	const authStore = useAuthStore();
  if (!authStore.user) {
    return { path: '/login' };
  }
  return true;
}
