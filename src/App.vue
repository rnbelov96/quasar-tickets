<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "./layouts";
import { useTicketsStore } from "./stores/tickets";

const ticketsStore = useTicketsStore();

void ticketsStore.fetchTickets();
</script>
