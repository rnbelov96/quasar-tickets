<template>
  <TicketDetails :ticket="ticket"></TicketDetails>
</template>

<script setup>
import TicketDetails from "src/components/TicketDetails.vue";
import { useTicketsStore } from "src/stores/tickets";
import { useRoute, useRouter } from "vue-router";

const ticketStore = useTicketsStore();
const route = useRoute();
const router = useRouter();

const ticket = ticketStore.getTicketById(route.params.id);

if (!ticket) {
  router.push({ name: "Home" });
}
</script>

<style lang="scss" scoped></style>
