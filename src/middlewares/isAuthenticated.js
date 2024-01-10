import { useAuthStore } from 'src/stores/auth'

export default async function isAuthenticated() {
	const authStore = useAuthStore();
  
  if (!authStore.user) {
    const response = await authStore.checkUser();
    
    return response || { path: '/login' };
  }
  return true;
}
