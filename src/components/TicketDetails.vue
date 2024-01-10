<template>
  <div class="ticket">
    <div class="ticket__data-box">
      <p class="ticket__label">Создатель:</p>
      <p class="ticket__text">
        <router-link
          :to="{ name: 'Profile', params: { id: ticket.userData.id } }"
        >
          {{ `${ticket.userData.lastName} ${ticket.userData.name}` }}
        </router-link>
      </p>
    </div>
    <div class="ticket__data-box">
      <p class="ticket__label">ID тикета:</p>
      <p class="ticket__text">
        {{ ticket.id }}
      </p>
    </div>
    <div class="ticket__data-box">
      <p class="ticket__label">Заголовок:</p>
      <p class="ticket__text">
        {{ ticket.title }}
      </p>
    </div>
    <div class="ticket__data-box">
      <p class="ticket__label">Описание:</p>
      <p class="ticket__text">
        {{ ticket.text }}
      </p>
    </div>
    <div class="ticket__data-box">
      <p class="ticket__label">Дата создания:</p>
      <p class="ticket__text">
        {{ ticket.normalizedCreationDate }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ticket: {
    required: true,
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.ticket__data-box {
  margin-top: 1.5rem;
}

.ticket__label {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0;

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
}

.ticket__text {
  font-size: 1.1rem;
  margin-bottom: 0;
  margin-top: 0.3rem;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
}
</style>
