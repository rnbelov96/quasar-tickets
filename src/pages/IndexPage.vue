<template>
  <TicketsTable :ticket-list="ticketList"></TicketsTable>
</template>

<script setup>
import TicketsTable from "src/components/TicketsTable.vue";
import { useTicketsStore } from "src/stores/tickets";
import { computed } from "vue";
import { useRoute } from "vue-router";

const ticketsStore = useTicketsStore();
const route = useRoute();

const ticketList = computed(() => {
  return route.path === "/tickets"
    ? ticketsStore.authenticatedUserTickets
    : ticketsStore.ticketList;
});
</script>
