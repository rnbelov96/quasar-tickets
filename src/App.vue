<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "./layouts";
import { useAuthStore } from "./stores/auth";
import { useTicketsStore } from "./stores/tickets";

const ticketsStore = useTicketsStore();
const authStore = useAuthStore();

void authStore.checkUser();

void ticketsStore.fetchTickets();
</script>
