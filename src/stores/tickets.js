import { defineStore } from 'pinia'
import { ticketsService } from 'src/services'
import { useAuthStore } from './auth';

export const useTicketsStore = defineStore('tickets', {
	state: () => ({
    ticketList: []
	}),
	getters: {
		authenticatedUserTickets: (state) => {
			const authStore = useAuthStore();

			return state.ticketList.filter(ticket => ticket.userData.id === authStore.getUserAttribute('id'));
		},
		getTicketById: (state) => (ticketId) => {
			const ticket = state.ticketList.find(ticket => Number(ticket.id) === Number(ticketId))
			if (!ticket) {
				return null;
			}

			return ticket;
		}
	},
	actions: {
		async fetchTickets() {
			this.ticketList = await ticketsService.fetchTickets();
		},
	},
})
